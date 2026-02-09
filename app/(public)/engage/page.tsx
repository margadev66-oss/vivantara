import { prisma, withPrismaFallback } from "@/lib/prisma"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getEditablePage } from "@/lib/editable-pages"

const ENGAGE_CHILDREN = [
  { title: "Services Overview", url: "/engage/services-overview" },
  { title: "How It Works", url: "/engage/how-it-works" },
]

function normalizeEngageCards(
  children: Array<{ id: string; title: string; url: string | null; order: number }>
) {
  const byUrl = new Map(children.map((item) => [item.url, item]))

  return ENGAGE_CHILDREN.map((item, index) => {
    const existing = byUrl.get(item.url)
    return {
      id: existing?.id ?? `engage-card-fallback-${index}`,
      title: item.title,
      url: item.url,
      order: index,
    }
  })
}

export default async function EngageIndex() {
  const editablePage = await getEditablePage("engage")
  const menu = await withPrismaFallback(
    () =>
      prisma.menuItem.findFirst({
        where: { title: "Engage with Us" },
        include: { children: { orderBy: { order: "asc" } } }
      }),
    null,
    "EngageIndex.menu"
  )
  const visibleChildren = menu?.children
    ? normalizeEngageCards(menu.children)
    : []

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        {editablePage ? (
          <section className="section-card rounded-2xl p-8 md:p-10 mb-16">
            <h1 className="text-4xl md:text-6xl font-serif text-thought mb-6">{editablePage.title}</h1>
            <div
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-thought prose-p:text-thought/85 prose-li:text-thought/85 prose-a:text-action"
              dangerouslySetInnerHTML={{ __html: editablePage.content }}
            />
          </section>
        ) : (
          <>
            <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">Engaging with Vivartana</h1>

            <div className="space-y-6 text-thought/75 text-lg leading-relaxed max-w-4xl mb-16">
              <p>
                Engaging with Vivartana is a structured, iterative journey to understand and progressively strengthen
                the organisational dimensions that determine how people sense, interpret, coordinate, and hold together
                under pressure.
              </p>
              <p>
                Organisations reveal their true character not in routine operations, but when they are tested by
                uncertainty, disruption, and stress.
              </p>
              <p>Vivartana focuses on strengthening the underlying properties that shape this response.</p>
            </div>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleChildren.map((item) => (
            <Link 
              key={item.id} 
              href={item.url || "#"}
              className="group border border-warmth/20 bg-white p-10 hover:border-action transition-colors"
            >
              <h3 className="text-2xl font-serif text-thought group-hover:text-action mb-4 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center text-sm font-medium text-warmth group-hover:text-action transition-colors">
                <span>Explore</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
