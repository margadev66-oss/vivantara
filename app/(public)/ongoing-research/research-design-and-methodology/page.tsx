import EditablePageContent from "@/components/EditablePageContent"
import { getEditablePage } from "@/lib/editable-pages"

const stagedApproach = [
  "Exploratory qualitative inquiry to understand how individuals at different organisational levels perceive and describe behaviour during stressful situations.",
  "Pattern identification across organisations to observe recurring behavioural themes.",
  "Quantitative validation through structured instruments to examine how these patterns relate to organisational coherence and performance under strain.",
  "Interpretive qualitative analysis to refine understanding of how organisational properties influence behaviour.",
]

const organisationLevels = [
  "Senior leadership",
  "Middle management",
  "Operational team members",
]

export default async function OngoingResearchDesignMethodologyPage() {
  const editablePage = await getEditablePage("ongoing-research/research-design-and-methodology")
  if (editablePage) {
    return <EditablePageContent title={editablePage.title} content={editablePage.content} />
  }

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">Research Design and Methodology</h1>

        <div className="space-y-6 text-thought/75 text-lg leading-relaxed max-w-4xl mb-14">
          <p>
            The doctoral research informing Vivartana&apos;s work adopts a qualitative-heavy, multi-stage mixed methods
            design to understand how organisations function under stress, ambiguity, and disruption.
          </p>
          <p>
            The methodology is designed to explore organisational behaviour from multiple perspectives and progressively
            build a deeper understanding of the properties that shape collective response under pressure.
          </p>
        </div>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-6">Overall Approach</h2>
          <p className="text-thought/75 text-lg leading-relaxed mb-6">The study follows a staged approach:</p>
          <ul className="space-y-3">
            {stagedApproach.map((stage) => (
              <li key={stage} className="text-thought/80 text-lg leading-relaxed">
                {stage}
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-6">Multi-Level Perspective</h2>
          <p className="text-thought/75 text-lg leading-relaxed mb-6">For each participating organisation, perspectives are gathered from:</p>
          <ul className="space-y-3 mb-6">
            {organisationLevels.map((level) => (
              <li key={level} className="text-thought/80 text-lg leading-relaxed">
                {level}
              </li>
            ))}
          </ul>
          <p className="text-thought/75 text-lg leading-relaxed">
            This helps develop a holistic organisational view derived from multiple lived experiences.
          </p>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-5">Connection to Vivartana&apos;s Practice</h2>
          <p className="text-thought/75 text-lg leading-relaxed">
            The ORI Scan and the focus on Organisational Stress Response draw inspiration from this research design.
          </p>
          <p className="text-thought/75 text-lg leading-relaxed mt-4">
            They translate research thinking into structured organisational engagement.
          </p>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-12">
          <h2 className="text-3xl font-serif text-thought mb-5">Evolving Nature of the Design</h2>
          <p className="text-thought/75 text-lg leading-relaxed">
            As with most exploratory research, the design is expected to evolve as insights emerge from early stages of
            inquiry.
          </p>
          <p className="text-thought/75 text-lg leading-relaxed mt-4">
            This flexibility allows the research to remain grounded in observed organisational realities rather than
            fixed assumptions.
          </p>
        </section>

        <section className="border border-thought/10 bg-thought text-white p-8 md:p-10">
          <h2 className="text-3xl font-serif mb-5">Closing</h2>
          <p className="text-warmth/90 text-lg leading-relaxed">
            The methodology is intended to build a rigorous, evidence-informed understanding of how organisations can
            progressively strengthen their ability to function coherently when tested.
          </p>
        </section>
      </div>
    </main>
  )
}
