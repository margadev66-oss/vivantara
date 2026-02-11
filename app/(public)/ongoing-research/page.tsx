import { prisma, withPrismaFallback } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { getEditablePage } from "@/lib/editable-pages"

export default async function OngoingResearchIndex() {
  const editablePage = await getEditablePage("ongoing-research")
  const menu = await withPrismaFallback(
    () =>
      prisma.menuItem.findFirst({
        where: { title: "Ongoing Research" },
        include: { children: { orderBy: { order: "asc" } } },
      }),
    null,
    "OngoingResearchIndex.menu"
  )

  return (
    <main className="relative min-h-screen bg-canvas pt-12 pb-24 px-6 overflow-hidden">
      <Image
        src="/assests/research/bg.jpg"
        alt="Research background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/50 via-canvas/72 to-canvas/88" />
      <div className="container mx-auto max-w-7xl relative z-10">
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
            <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">Ongoing Research</h1>
            <p className="text-thought/70 text-xl max-w-3xl mb-16 leading-relaxed">
              The living body of inquiry shaping the founder&apos;s DBA: themes, methods, and the evolution of ideas in practice.
            </p>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menu?.children.map((item) => (
            <Link
              key={item.id}
              href={item.url || "#"}
              className="group border border-warmth/20 bg-white p-10 hover:border-action transition-colors"
            >
              <h2 className="text-2xl font-serif text-thought group-hover:text-action mb-4 transition-colors">
                {item.title}
              </h2>
              <div className="flex items-center text-sm font-medium text-warmth group-hover:text-action transition-colors">
                <span>Read More</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}


