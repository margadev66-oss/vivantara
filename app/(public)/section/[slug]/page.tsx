import { prisma } from "@/lib/prisma"

import Link from "next/link"

export default async function SectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Try to find matching menu item by reconstructing title or just searching posts by category match?
  // Since slug is "research-reflections", title might be "Research Reflections".
  // A robust way is to store slug in MenuItem. I didn't add slug field, but I generated url.
  // I'll search MenuItem where url ends with slug.

  const menuItem = await prisma.menuItem.findFirst({
    where: {
      url: {
        contains: slug
      }
    }
  })

  if (!menuItem) {
    // If not a menu item, maybe just a category check?
    // Let's assume slug maps to category title normalized.
    // Or just 404 for now if not strictly matched.
    // For simplicity, let's just display the slug title formatted.
  }

  const title = menuItem?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  // Fetch posts with this category
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      category: title // Exact match on title needed.
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif text-thought mb-12 border-b border-warmth/20 pb-6">
          {title}
        </h1>

        {posts.length > 0 ? (
          <div className="grid gap-12">
            {posts.map((post) => (
              <article key={post.id} className="group">
                <Link href={`/writing/${post.slug}`}>
                  <h2 className="text-2xl font-serif text-thought group-hover:text-action transition-colors mb-3">
                    {post.title}
                  </h2>
                </Link>
                <div className="text-sm text-warmth mb-4">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <div
                  className="text-thought/80 leading-relaxed line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: (post.content || '').substring(0, 300) + '...' }}
                />
                <Link
                  href={`/writing/${post.slug}`}
                  className="inline-block mt-4 text-sm font-medium text-action border-b border-action/20 hover:border-action transition-colors"
                >
                  Read Essay
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center border border-dashed border-warmth/30 rounded">
            <p className="text-thought/60 text-lg">Coming soon.</p>
            <p className="text-thought/40 mt-2">Content for this section is being curated.</p>
          </div>
        )}
      </div>
    </main>
  )
}
