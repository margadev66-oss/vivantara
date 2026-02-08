import EditablePageContent from "@/components/EditablePageContent"
import { getEditablePage } from "@/lib/editable-pages"

const frameworkSections = [
  {
    title: "Organisational Stress Response (OSR)",
    paragraphs: [
      "Every organisation has a characteristic way of responding when things go wrong.",
      "Some become confused. Some fragment. Some coordinate. Some adapt.",
      "Organisational Stress Response is the lens through which Vivartana understands how people within an organisation sense, interpret, coordinate, and hold together under strain.",
    ],
  },
  {
    title: "ORI Scan™ - Organisational Response Imaging",
    paragraphs: [
      "The ORI Scan™ functions like an imaging process for organisations.",
      "Through structured conversations and observations, it reveals how the organisation actually behaves under pressure across six critical dimensions.",
      "These patterns often remain invisible in routine functioning but become decisive in moments of stress and disruption.",
    ],
  },
  {
    title: "Organisational Operating System (OOS™)",
    paragraphs: [
      "At any point in time, an organisation operates at a certain level of maturity in how it responds to challenges.",
      "This operating maturity is referred to as its Organisational Operating System (OOS™).",
      "As organisations strengthen the dimensions revealed by the ORI Scan™, their OOS™ progressively matures.",
    ],
  },
  {
    title: "Antifragility & the Antifragility Achievement Index (AAI™)",
    paragraphs: [
      "Antifragility is the state where an organisation does not merely withstand stress but grows stronger through it.",
      "The Antifragility Achievement Index (AAI™) is used to observe how well an organisation's current OOS™ supports coherent functioning under pressure.",
      "As the OOS™ matures, the AAI™ improves, indicating a movement toward antifragility.",
    ],
  },
  {
    title: "Cognitive Diversity and Neurodiversity",
    paragraphs: [
      "Different minds respond differently under stress.",
      "Abilities such as pattern recognition, deep focus, systems thinking, and signal detection often become most valuable in ambiguous and high-pressure situations.",
      "Vivartana's frameworks help organisations recognise and deploy these strengths where they matter most.",
    ],
  },
]

export default async function KnowledgeAssetsFrameworksPage() {
  const editablePage = await getEditablePage("knowledge-assets/frameworks")
  if (editablePage) {
    return <EditablePageContent title={editablePage.title} content={editablePage.content} />
  }

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">Frameworks That Inform Vivartana&apos;s Work</h1>

        <div className="space-y-6 text-thought/75 text-lg leading-relaxed max-w-4xl mb-14">
          <p>
            Vivartana&apos;s work is grounded in a set of interlinked frameworks that help organisations understand how they function under pressure and how they can progressively strengthen their internal coherence.
          </p>
          <p>These frameworks are simple to understand, yet powerful in application.</p>
        </div>

        <section className="space-y-8 mb-12">
          {frameworkSections.map((section) => (
            <article key={section.title} className="border border-warmth/20 bg-white p-8 md:p-10">
              <h2 className="text-3xl font-serif text-thought mb-5">{section.title}</h2>
              <div className="space-y-4 text-thought/75 text-lg leading-relaxed">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="border border-thought/10 bg-thought text-white p-8 md:p-10">
          <p className="text-white text-lg leading-relaxed">
            These frameworks together provide a structured way to understand and strengthen how organisations function when tested.
          </p>
          <p className="text-white text-lg leading-relaxed mt-4">
            They form the intellectual foundation of Vivartana&apos;s work.
          </p>
        </section>
      </div>
    </main>
  )
}
