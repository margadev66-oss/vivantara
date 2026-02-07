import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getEditablePage } from "@/lib/editable-pages"

export default async function KnowledgeAssetsIndex() {
  const editablePage = await getEditablePage("knowledge-assets")
  const menu = await prisma.menuItem.findFirst({
    where: { title: "Knowledge Assets" },
    include: { children: { orderBy: { order: "asc" } } },
  })

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
            <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">Knowledge Assets</h1>
            <p className="text-thought/70 text-xl max-w-3xl mb-16 leading-relaxed">
              Frameworks, casework, and published thinking that make Vivartana&apos;s approach distinct and repeatable.
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
                <span>View</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
