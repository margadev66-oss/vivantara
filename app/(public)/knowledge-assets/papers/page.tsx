import EditablePageContent from "@/components/EditablePageContent"
import { getEditablePage } from "@/lib/editable-pages"
import Image from "next/image"

const keyIdeas = [
  "Organisations function as psychosocial systems",
  "Stress reveals underlying organisational properties",
  "Cognitive Diversity and Neurodiversity influence organisational response",
  "Leadership behaviour shapes how teams coordinate under strain",
  "Organisational maturity can be observed and progressively strengthened",
]

const selectedPapers = [
  "Literature review summaries",
  "Concept notes",
  "Research reflections",
  "Practice-linked insights",
]

export default async function KnowledgeAssetsPapersPage() {
  const editablePage = await getEditablePage("knowledge-assets/papers")
  if (editablePage) {
    return <EditablePageContent title={editablePage.title} content={editablePage.content} />
  }

  return (
    <main className="relative min-h-screen bg-canvas pt-12 pb-24 px-6 overflow-hidden">
      <Image
        src="/assests/knowledge-assests/bg2.jpeg"
        alt="Research foundations background image"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/46 via-canvas/68 to-canvas/84" />
      <div className="container mx-auto max-w-7xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">Research Foundations</h1>

        <div className="space-y-6 text-thought/75 text-lg leading-relaxed max-w-4xl mb-14">
          <p>
            Vivartana&apos;s work is informed by ongoing doctoral research into how organisations function under stress,
            ambiguity, and disruption.
          </p>
          <p>
            This research explores how organisational properties influence behaviour under pressure and how organisations
            can progressively strengthen their operating maturity.
          </p>
        </div>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-5">Core Research Theme</h2>
          <p className="text-thought text-xl leading-relaxed mb-5">
            Antifragility Excellence in AI-enabled Service Organisations: The Role of Organisational Intelligence
          </p>
          <p className="text-thought/75 text-lg leading-relaxed">
            This research examines how organisations can move beyond process excellence and develop deeper internal
            coherence that enables them to function coherently and grow stronger when tested by stress, ambiguity, and
            disruption.
          </p>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-6">Key Ideas Informing This Work</h2>
          <ul className="space-y-3">
            {keyIdeas.map((idea) => (
              <li key={idea} className="text-thought/80 text-lg leading-relaxed">
                {idea}
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-5">From Research to Practice</h2>
          <p className="text-thought/75 text-lg leading-relaxed">
            The ORI Scan™, OOS™, and the focus on Organisational Stress Response are practical expressions of these
            research insights.
          </p>
          <p className="text-thought/75 text-lg leading-relaxed mt-4">
            They translate complex research ideas into actionable organisational engagement.
          </p>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-12">
          <h2 className="text-3xl font-serif text-thought mb-6">Selected Papers &amp; Notes (placeholders for future uploads)</h2>
          <ul className="space-y-3">
            {selectedPapers.map((item) => (
              <li key={item} className="text-thought/80 text-lg leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-thought/10 bg-thought text-white p-8 md:p-10">
          <p className="text-white text-lg leading-relaxed">
            This research continues to evolve and directly informs Vivartana&apos;s approach to organisational
            transformation.
          </p>
        </section>
      </div>
    </main>
  )
}

