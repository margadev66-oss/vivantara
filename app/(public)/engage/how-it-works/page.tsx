import EditablePageContent from "@/components/EditablePageContent"
import { getEditablePage } from "@/lib/editable-pages"

const phaseTwoFocusAreas = [
  "Leadership behaviour under stress",
  "Role alignment with cognitive strengths",
  "Psychosocial alignment across teams",
  "Effective use of Cognitive Diversity and Neurodiversity",
]

const cycleStages = ["Scan", "Interpret", "Strengthen", "Re-Scan"]

export default async function EngageHowItWorksPage() {
  const editablePage = await getEditablePage("engage/how-it-works")
  if (editablePage) {
    return <EditablePageContent title={editablePage.title} content={editablePage.content} />
  }

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">How the Vivartana Engagement Unfolds</h1>

        <div className="space-y-6 text-thought/75 text-lg leading-relaxed max-w-4xl mb-14">
          <p>
            Vivartana follows a structured, iterative workflow designed to progressively strengthen the organisational
            dimensions that shape behaviour under pressure.
          </p>
          <p>This is a cycle of seeing clearly, strengthening deliberately, and observing change.</p>
        </div>

        <section className="space-y-8 mb-14">
          <article className="border border-warmth/20 bg-white p-8 md:p-10">
            <h2 className="text-3xl font-serif text-thought mb-5">Phase 1 - ORI Scan™ (Organisational Response Imaging)</h2>
            <div className="space-y-4 text-thought/75 text-lg leading-relaxed">
              <p>The journey begins with ORI Scan™.</p>
              <p>
                Through structured conversations, observations, and guided reflections, Vivartana images how the
                organisation actually behaves when faced with stress, ambiguity, and disruption.
              </p>
              <p>
                This reveals patterns that are rarely visible in routine operations but become decisive when the
                organisation is tested.
              </p>
            </div>
          </article>

          <article className="border border-warmth/20 bg-white p-8 md:p-10">
            <h2 className="text-3xl font-serif text-thought mb-5">Phase 2 - Interpreting the Image</h2>
            <div className="space-y-4 text-thought/75 text-lg leading-relaxed">
              <p>Insights from the ORI Scan™ are translated into clear focus areas.</p>
              <p>These typically involve:</p>
              <ul className="space-y-3">
                {phaseTwoFocusAreas.map((item) => (
                  <li key={item} className="text-thought/80 text-lg leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
              <p>This becomes a practical roadmap for strengthening the organisation.</p>
            </div>
          </article>

          <article className="border border-warmth/20 bg-white p-8 md:p-10">
            <h2 className="text-3xl font-serif text-thought mb-5">Phase 3 - Strengthening the Underlying Dimensions</h2>
            <div className="space-y-4 text-thought/75 text-lg leading-relaxed">
              <p>
                Vivartana works with leadership and teams over time to strengthen these dimensions through structured
                conversations, reflection, and systemic adjustments.
              </p>
              <p>
                The focus is not on quick fixes, but on improving the underlying properties that shape organisational
                response.
              </p>
            </div>
          </article>
        </section>

        <section className="border border-thought/10 bg-thought text-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif mb-4">The Iterative Cycle</h2>
          <p className="text-white text-lg leading-relaxed mb-6">After a defined period, the ORI Scan™ is repeated.</p>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {cycleStages.map((stage) => (
              <span key={stage} className="px-4 py-2 rounded-full border border-white/20 text-sm uppercase tracking-wide">
                {stage}
              </span>
            ))}
          </div>
          <p className="text-white text-lg leading-relaxed">
            Each cycle allows the organisation to see how its behaviour under pressure is evolving.
          </p>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-12">
          <h2 className="text-3xl font-serif text-thought mb-5">From Current State to Antifragility</h2>
          <div className="space-y-4 text-thought/75 text-lg leading-relaxed">
            <p>
              At any point, the organisation operates at a certain level of maturity known as its Organisational
              Operating System (OOS™).
            </p>
            <p>
              As successive cycles strengthen the OOS™, the organisation&apos;s Antifragility Achievement Index (AAI™)
              improves, indicating a growing ability to function coherently and grow stronger through stress and disruption.
            </p>
          </div>
        </section>

        <section className="border border-thought/10 bg-thought text-white p-8 md:p-10">
          <p className="text-white text-lg leading-relaxed">
            Real organisational change begins not with new processes, but with seeing how the organisation truly
            behaves when tested.
          </p>
        </section>
      </div>
    </main>
  )
}
