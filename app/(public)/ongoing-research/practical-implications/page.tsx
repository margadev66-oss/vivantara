import EditablePageContent from "@/components/EditablePageContent"
import { getEditablePage } from "@/lib/editable-pages"

const practicalGains = [
  "Understand why capable people appear to underperform in critical situations",
  "Recognise how leadership behaviour influences collective response under pressure",
  "See how Cognitive Diversity and Neurodiversity affect performance in complex environments",
  "Identify gaps between leadership intent and team behaviour",
  "Strengthen internal coherence rather than relying only on process and structure",
]

const translatedFrameworks = [
  "Organisational Stress Response",
  "ORI Scan™ (Organisational Response Imaging)",
  "Organisational Operating System (OOS™)",
]

export default async function OngoingResearchPracticalImplicationsPage() {
  const editablePage = await getEditablePage("ongoing-research/practical-implications")
  if (editablePage) {
    return <EditablePageContent title={editablePage.title} content={editablePage.content} />
  }

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">Practical Implications for Organisations</h1>

        <div className="space-y-6 text-thought/75 text-lg leading-relaxed max-w-4xl mb-14">
          <p>
            While the research is ongoing, its direction already points toward important practical questions for
            organisations.
          </p>
          <p>
            At its heart lies a simple idea: the way organisations behave under stress is shaped by deeper internal
            properties that are often overlooked in routine operations.
          </p>
          <p>Understanding and strengthening these properties has significant practical implications.</p>
        </div>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-6">What Organisations May Gain from This Work</h2>
          <p className="text-thought/75 text-lg leading-relaxed mb-6">This line of research seeks to help organisations:</p>
          <ul className="space-y-3">
            {practicalGains.map((item) => (
              <li key={item} className="text-thought/80 text-lg leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-5">From Insight to Action</h2>
          <p className="text-thought/75 text-lg leading-relaxed mb-6">
            These ideas are already being translated into practice through Vivartana&apos;s frameworks such as:
          </p>
          <ul className="space-y-3 mb-6">
            {translatedFrameworks.map((framework) => (
              <li key={framework} className="text-thought/80 text-lg leading-relaxed">
                {framework}
              </li>
            ))}
          </ul>
          <p className="text-thought/75 text-lg leading-relaxed">
            These frameworks aim to make research insights usable in real organisational settings.
          </p>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-12">
          <h2 className="text-3xl font-serif text-thought mb-5">Why This Matters in Today&apos;s Context</h2>
          <div className="space-y-4 text-thought/75 text-lg leading-relaxed">
            <p>
              In fast-changing, AI-enabled, and high-pressure environments, organisations need more than process
              efficiency.
            </p>
            <p>They need the ability to function coherently when tested.</p>
            <p>
              This research aims to understand how that capability can be observed and progressively strengthened.
            </p>
          </div>
        </section>

        <section className="border border-thought/10 bg-thought text-white p-8 md:p-10">
          <h2 className="text-3xl font-serif mb-5">Closing</h2>
          <p className="text-white text-lg leading-relaxed">
            As the research progresses, its practical implications will continue to inform how Vivartana supports
            organisations in strengthening their response to stress and disruption.
          </p>
        </section>
      </div>
    </main>
  )
}
