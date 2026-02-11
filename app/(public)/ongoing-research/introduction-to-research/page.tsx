import EditablePageContent from "@/components/EditablePageContent"
import { getEditablePage } from "@/lib/editable-pages"
import Image from "next/image"

const researchFocusAreas = [
  "How people interpret complex situations",
  "How teams coordinate under strain",
  "How leadership behaviour shapes collective response",
  "How Cognitive Diversity and Neurodiversity affect performance in demanding situations",
  "How organisations can progressively strengthen their ability to function coherently under pressure",
]

const practicalFrameworks = [
  "Organisational Stress Response",
  "ORI Scan™ (Organisational Response Imaging)",
  "Organisational Operating System (OOS™)",
  "Antifragility Achievement Index (AAI™)",
]

export default async function OngoingResearchIntroductionPage() {
  const editablePage = await getEditablePage("ongoing-research/introduction-to-research")
  if (editablePage) {
    return <EditablePageContent title={editablePage.title} content={editablePage.content} />
  }

  return (
    <main className="relative min-h-screen bg-canvas pt-12 pb-24 px-6 overflow-hidden">
      <Image
        src="/assests/research/bg.jpg"
        alt="Research introduction background image"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/32 via-canvas/54 to-canvas/74" />
      <div className="container mx-auto max-w-7xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">Introduction</h1>

        <div className="space-y-6 text-thought/75 text-lg leading-relaxed max-w-4xl mb-14">
          <p>
            Vivartana&apos;s work is closely informed by ongoing doctoral research into how organisations function under
            stress, ambiguity, and disruption.
          </p>
          <p>
            This research explores a simple but powerful idea: the way an organisation behaves when tested reveals the
            quality of its internal coherence.
          </p>
        </div>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-6">What This Research Seeks to Understand</h2>
          <p className="text-thought/75 text-lg leading-relaxed mb-6">
            The research examines how organisational properties influence:
          </p>
          <ul className="space-y-3">
            {researchFocusAreas.map((item) => (
              <li key={item} className="text-thought/80 text-lg leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-5">Why This Matters for Organisations</h2>
          <div className="space-y-4 text-thought/75 text-lg leading-relaxed">
            <p>
              Many organisations invest heavily in process excellence, performance metrics, and strategic planning.
            </p>
            <p>
              Yet, when unexpected challenges arise, these do not always translate into effective collective behaviour.
            </p>
            <p>
              This research investigates why that happens and how organisations can address it at a deeper level.
            </p>
          </div>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-12">
          <h2 className="text-3xl font-serif text-thought mb-6">From Research to Practice</h2>
          <p className="text-thought/75 text-lg leading-relaxed mb-6">
            The ideas emerging from this research directly inform Vivartana&apos;s frameworks such as:
          </p>
          <ul className="space-y-3 mb-6">
            {practicalFrameworks.map((framework) => (
              <li key={framework} className="text-thought/80 text-lg leading-relaxed">
                {framework}
              </li>
            ))}
          </ul>
          <p className="text-thought/75 text-lg leading-relaxed">
            These are practical expressions of the research insights.
          </p>
        </section>

        <section className="border border-thought/10 bg-thought text-white p-8 md:p-10">
          <h2 className="text-3xl font-serif mb-5">Closing</h2>
          <p className="text-white text-lg leading-relaxed">
            This research is ongoing and continues to shape how Vivartana approaches organisational transformation in
            real-world settings.
          </p>
        </section>
      </div>
    </main>
  )
}

