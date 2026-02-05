import { prisma } from "@/lib/prisma"

async function GenericPage({ params, section }: { params: { slug: string }, section: string }) {
  const { slug } = params
  const fullSlug = `${section}/${slug}`

  const page = await prisma.page.findUnique({
    where: { slug: fullSlug }
  })

  if (!page) {
    return (
      <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif text-thought mb-12 capitalize">
            {slug.replace(/-/g, " ")}
          </h1>
          <div className="p-6 border border-warmth/20 bg-white">
            <p className="text-thought/70">Content for {fullSlug} has not been created yet.</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-serif text-thought mb-12">
          {page.title}
        </h1>
        <div
          className="prose prose-lg prose-headings:font-serif prose-headings:text-thought prose-p:text-thought/90 prose-a:text-action max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </main>
  )
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  return <GenericPage params={resolvedParams} section="engage" />
}
