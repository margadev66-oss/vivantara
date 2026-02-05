import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function ResourcesArticlesPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const { category } = searchParams

  const where = {
    published: true,
    ...(category ? { category } : {})
  }

  const posts = await prisma.post.findMany({
    where,
    orderBy: { createdAt: "desc" }
  })

  const categories = await prisma.post.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ["category"]
  })

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-serif text-thought mb-4">Articles / Blogs</h1>
        <p className="text-thought/60 text-lg mb-12 max-w-2xl">
          Essays and reflections across individuals, teams, organisations, and research.
        </p>

        <div className="flex flex-col md:flex-row gap-12">
          <aside className="w-full md:w-64 flex-shrink-0">
            <h3 className="text-sm uppercase tracking-widest text-warmth mb-4 border-b border-warmth/20 pb-2">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/resources/articles"
                  className={`block text-sm ${!category ? "text-action font-medium" : "text-thought/70 hover:text-thought"}`}
                >
                  All Articles
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.category}>
                  <Link
                    href={`/resources/articles?category=${encodeURIComponent(c.category)}`}
                    className={`block text-sm ${category === c.category ? "text-action font-medium" : "text-thought/70 hover:text-thought"}`}
                  >
                    {c.category}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <div className="flex-1">
            {posts.length > 0 ? (
              <div className="grid gap-12">
                {posts.map((post) => (
                  <article key={post.id} className="group border-b border-warmth/10 pb-8 last:border-0">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-warmth mb-2">
                      <span>{post.category}</span>
                      <span>&middot;</span>
                      <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                    </div>
                    <Link href={`/writing/${post.slug}`}>
                      <h2 className="text-2xl font-serif text-thought group-hover:text-action transition-colors mb-3">
                        {post.title}
                      </h2>
                    </Link>
                    <div
                      className="text-thought/80 leading-relaxed line-clamp-3 mb-4"
                      dangerouslySetInnerHTML={{ __html: (post.content || "").replace(/<[^>]*>?/gm, "").substring(0, 200) + "..." }}
                    />
                    <Link
                      href={`/writing/${post.slug}`}
                      className="inline-block text-sm font-medium text-action hover:underline"
                    >
                      Read Essay
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center border border-dashed border-warmth/30 rounded">
                <p className="text-thought/60">No articles found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
