import EditablePageContent from "@/components/EditablePageContent"
import { getEditablePage } from "@/lib/editable-pages"

const downloadTopics = [
  "Overview of Organisational Stress Response",
  "Introduction to ORI Scan™ (Organisational Response Imaging)",
  "Understanding the Organisational Operating System (OOS™)",
  "Notes on Cognitive Diversity and Neurodiversity in organisations",
  "Session briefs and discussion guides",
]

export default async function ResourcesDownloadsPage() {
  const editablePage = await getEditablePage("resources/downloads")
  if (editablePage) {
    return <EditablePageContent title={editablePage.title} content={editablePage.content} />
  }

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">Downloads</h1>

        <div className="space-y-6 text-thought/75 text-lg leading-relaxed max-w-4xl mb-14">
          <p>
            This section contains concise resources that explain Vivartana&apos;s frameworks and ideas in a visual and
            easy-to-understand format.
          </p>
          <p>
            These materials are designed for leaders and teams who wish to explore how organisations function under
            pressure and how they can progressively strengthen their internal coherence.
          </p>
        </div>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-6">What You Will Find Here</h2>
          <ul className="space-y-3">
            {downloadTopics.map((topic) => (
              <li key={topic} className="text-thought/80 text-lg leading-relaxed">
                {topic}
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-12">
          <h2 className="text-3xl font-serif text-thought mb-5">Purpose of These Resources</h2>
          <p className="text-thought/75 text-lg leading-relaxed">
            These downloads are intended to make the concepts behind Vivartana&apos;s work accessible and usable for
            organisational discussions and reflection.
          </p>
        </section>

        <section className="border border-thought/10 bg-thought text-white p-8 md:p-10">
          <h2 className="text-3xl font-serif mb-5">Closing</h2>
          <p className="text-white text-lg leading-relaxed mb-4">
            New resources will be added here as Vivartana&apos;s work and research continue to evolve.
          </p>
          <p className="text-white text-lg leading-relaxed">Browse available downloads.</p>
        </section>
      </div>
    </main>
  )
}
