import { prisma } from "@/lib/prisma"

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const fullSlug = `knowledge-assets/${slug}`

  const page =
    (await prisma.page.findUnique({ where: { slug: fullSlug } })) ??
    (await prisma.page.findUnique({ where: { slug: `knowledge/${slug}` } }))

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-serif text-thought mb-12 capitalize">
          {page ? page.title : slug.replace(/-/g, " ")}
        </h1>
        {page ? (
          <div
            className="prose prose-lg prose-headings:font-serif prose-headings:text-thought prose-p:text-thought/90 prose-a:text-action max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        ) : (
          <p className="text-thought/70">Content pending.</p>
        )}
      </div>
    </main>
  )
}
