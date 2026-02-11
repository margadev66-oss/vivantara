import { prisma, withPrismaFallback } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { getEditablePage } from "@/lib/editable-pages"

const resourceHighlights = [
  {
    title: "Articles",
    description:
      "Reflections and observations from workplaces, exploring Organisational Stress Response and related themes.",
  },
  {
    title: "Downloads",
    description: "Concise visual and written explainers of Vivartana's frameworks.",
  },
  {
    title: "FAQs",
    description: "Answers to common questions about ORI Scan™, OOS™, and the approach.",
  },
  {
    title: "Envisions",
    description: "The long-term view that guides Vivartana's work.",
  },
]

export default async function ResourcesIndex() {
  const editablePage = await getEditablePage("resources")
  const menu = await withPrismaFallback(
    () =>
      prisma.menuItem.findFirst({
        where: { title: "Resources" },
        include: { children: { orderBy: { order: "asc" } } }
      }),
    null,
    "ResourcesIndex.menu"
  )

  return (
    <main className="relative min-h-screen bg-canvas pt-12 pb-24 px-6 overflow-hidden">
      <Image
        src="/assests/resoursces/bg.jpeg"
        alt="Resources background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/34 via-canvas/58 to-canvas/76" />
      <div className="container mx-auto max-w-7xl relative z-10">
        {editablePage ? (
          <section className="section-card rounded-2xl p-8 md:p-10 mb-14">
            <h1 className="text-4xl md:text-6xl font-serif text-thought mb-6">{editablePage.title}</h1>
            <div
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-thought prose-p:text-thought/85 prose-li:text-thought/85 prose-a:text-action"
              dangerouslySetInnerHTML={{ __html: editablePage.content }}
            />
          </section>
        ) : (
          <>
            <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">Resources</h1>

            <div className="space-y-6 text-thought/75 text-lg leading-relaxed max-w-4xl mb-12">
              <p>
                This section brings together reflections, practical notes, visual explainers, and frequently asked
                questions related to Vivartana&apos;s work.
              </p>
              <p>
                These resources are intended to help leaders and teams explore how organisations behave under pressure and
                how they can progressively strengthen their internal coherence.
              </p>
            </div>

            <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
              <h2 className="text-3xl font-serif text-thought mb-6">What You Will Find Here</h2>
              <ul className="space-y-5">
                {resourceHighlights.map((item) => (
                  <li key={item.title} className="text-thought/80 text-lg leading-relaxed">
                    <span className="font-medium text-thought">{item.title}</span> — {item.description}
                  </li>
                ))}
              </ul>
            </section>

            <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-12">
              <h2 className="text-3xl font-serif text-thought mb-5">Why This Section Exists</h2>
              <p className="text-thought/75 text-lg leading-relaxed mb-4">
                Understanding how organisations behave when tested often begins with noticing familiar patterns from a new
                perspective.
              </p>
              <p className="text-thought/75 text-lg leading-relaxed">
                These resources are meant to support that discovery.
              </p>
            </section>

            <section className="border border-thought/10 bg-thought text-white p-8 md:p-10 mb-14">
              <p className="text-white text-lg leading-relaxed">
                Sometimes, clarity begins by seeing what has always been there, just from a different lens.
              </p>
            </section>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menu?.children.map((item) => (
            <Link 
              key={item.id} 
              href={item.url || "#"}
              className="group border border-warmth/20 bg-white p-10 hover:border-action transition-colors"
            >
              <h3 className="text-2xl font-serif text-thought group-hover:text-action mb-4 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center text-sm font-medium text-warmth group-hover:text-action transition-colors">
                <span>Open</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}


