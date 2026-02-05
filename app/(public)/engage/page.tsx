import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default async function EngageIndex() {
  const menu = await prisma.menuItem.findFirst({
    where: { title: "Engage with Us" },
    include: { children: { orderBy: { order: "asc" } } }
  })

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">Engage with Us</h1>
        <p className="text-thought/70 text-xl max-w-3xl mb-16 leading-relaxed">
          Clear pathways for individuals and organisations to work with Vivartana, from first contact to long-term partnerships.
        </p>

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
