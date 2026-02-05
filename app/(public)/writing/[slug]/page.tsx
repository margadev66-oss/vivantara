import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const post = await prisma.post.findFirst({
    where: { slug, published: true }
  })

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <article className="container mx-auto max-w-3xl">
        <header className="mb-12 text-center">
          <div className="text-sm uppercase tracking-widest text-warmth mb-4">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-thought leading-tight mb-6">
            {post.title}
          </h1>
          <time className="text-thought/60 italic">
            {new Date(post.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </header>

        <div
          className="prose prose-lg prose-headings:font-serif prose-headings:text-thought prose-p:text-thought/90 prose-a:text-action max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  )
}
