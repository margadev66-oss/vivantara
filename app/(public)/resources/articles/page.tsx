import { prisma, withPrismaFallback } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { getEditablePage } from "@/lib/editable-pages"

const articleThemes = [
  "Why capable people appear to underperform in the wrong roles",
  "How organisations reveal their true character when things go wrong",
  "The role of Cognitive Diversity and Neurodiversity in high-pressure environments",
  "Psychological safety as a signal of organisational stress response",
  "Gaps between leadership intent and team behaviour",
  "Observations from real organisational situations",
]

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

  const posts = await withPrismaFallback(
    () =>
      prisma.post.findMany({
        where,
        orderBy: { createdAt: "desc" }
      }),
    [],
    "ResourcesArticlesPage.posts"
  )

  const categories = await withPrismaFallback(
    () =>
      prisma.post.findMany({
        where: { published: true },
        select: { category: true },
        distinct: ["category"]
      }),
    [],
    "ResourcesArticlesPage.categories"
  )

  const editablePage = await getEditablePage("resources/articles")

  return (
    <main className="relative min-h-screen bg-canvas pt-12 pb-24 px-6 overflow-hidden">
      <Image
        src="/assests/resoursces/bg.jpeg"
        alt="Resources articles background image"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/68 via-canvas/88 to-canvas/96" />
      <div className="container mx-auto max-w-7xl relative z-10">
        {editablePage ? (
          <section className="section-card rounded-2xl p-8 md:p-10 mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-thought mb-6">{editablePage.title}</h1>
            <div
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-thought prose-p:text-thought/85 prose-li:text-thought/85 prose-a:text-action"
              dangerouslySetInnerHTML={{ __html: editablePage.content }}
            />
          </section>
        ) : (
          <>
            <h1 className="text-4xl md:text-5xl font-serif text-thought mb-6">Articles and Reflections</h1>

            <div className="space-y-5 text-thought/75 text-lg leading-relaxed max-w-4xl mb-10">
              <p>
                Vivartana&apos;s work is accompanied by ongoing reflections on how organisations behave under pressure,
                how cognitive diversity shapes performance, and how leadership influences collective response during
                challenging situations.
              </p>
              <p>
                These articles explore practical observations from workplaces and connect them to the frameworks that
                inform Vivartana&apos;s work.
              </p>
            </div>

            <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
              <h2 className="text-3xl font-serif text-thought mb-6">Themes You Will Find Here</h2>
              <ul className="space-y-3">
                {articleThemes.map((theme) => (
                  <li key={theme} className="text-thought/80 text-lg leading-relaxed">
                    {theme}
                  </li>
                ))}
              </ul>
            </section>

            <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
              <h2 className="text-3xl font-serif text-thought mb-5">Purpose of These Articles</h2>
              <p className="text-thought/75 text-lg leading-relaxed mb-4">
                These writings are not academic papers and not promotional material.
              </p>
              <p className="text-thought/75 text-lg leading-relaxed">
                They are reflections intended to help leaders and teams see familiar situations from a different lens,
                one that focuses on how organisations behave when tested.
              </p>
            </section>

            <section className="border border-thought/10 bg-thought text-white p-8 md:p-10 mb-12">
              <h2 className="text-3xl font-serif mb-5">Closing</h2>
              <p className="text-white text-lg leading-relaxed mb-4">
                New articles are added periodically as Vivartana&apos;s work and research continue to evolve.
              </p>
              <a href="#latest-reflections" className="inline-block text-action hover:text-white transition-colors text-lg">
                Explore the latest reflections
              </a>
            </section>
          </>
        )}

        <div id="latest-reflections" className="flex flex-col md:flex-row gap-12">
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

