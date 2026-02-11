import EditablePageContent from "@/components/EditablePageContent"
import { getEditablePage } from "@/lib/editable-pages"
import Image from "next/image"

const studyLimitations = [
  {
    title: "Context specificity",
    description:
      "The study focuses on AI-enabled service organisations. Findings may therefore not be directly generalisable to other sectors without further study.",
  },
  {
    title: "Qualitative emphasis",
    description:
      "A significant portion of the study relies on qualitative inquiry and interpretive analysis. While structured interviews, multi-perspective inputs, and systematic pattern analysis are used to reduce individual bias, qualitative research cannot claim complete objectivity.",
  },
  {
    title: "Sample scope",
    description:
      "Organisational participation is limited in number due to the depth of engagement required for each case. The study prioritises depth of insight over breadth of coverage.",
  },
  {
    title: "Time-bound observation",
    description:
      "Organisational behaviour is observed over defined periods. The study cannot make claims about long-term organisational evolution beyond the research window.",
  },
  {
    title: "Multi-level perspectives",
    description:
      "Organisational understanding is derived from inputs across senior leadership, middle management, and operational roles. Differences in perception are expected and are treated as meaningful data that require synthesis rather than uniformity.",
  },
]

const futureDirections = [
  "Application of the framework across diverse industries",
  "Larger sample sizes for broader validation",
  "Development of more structured quantitative instruments",
  "Longitudinal studies to observe organisational evolution over extended periods",
  "Deeper exploration of how Cognitive Diversity and Neurodiversity influence organisational behaviour under stress",
]

export default async function OngoingResearchLimitationsFutureDirectionsPage() {
  const editablePage = await getEditablePage("ongoing-research/limitations-and-future-directions")
  if (editablePage) {
    return <EditablePageContent title={editablePage.title} content={editablePage.content} />
  }

  return (
    <main className="relative min-h-screen bg-canvas pt-12 pb-24 px-6 overflow-hidden">
      <Image
        src="/assests/research/bg.jpg"
        alt="Limitations and future directions background image"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/48 via-canvas/70 to-canvas/86" />
      <div className="container mx-auto max-w-7xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">Limitations and Future Directions</h1>

        <div className="space-y-6 text-thought/75 text-lg leading-relaxed max-w-4xl mb-14">
          <p>
            Every research study operates within defined boundaries shaped by its design, scope, and context. These
            boundaries do not represent weaknesses, but rather the limits within which the study&apos;s findings are
            intended to be interpreted.
          </p>
        </div>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-6">Study Limitations</h2>
          <p className="text-thought/75 text-lg leading-relaxed mb-6">
            The following limitations arise naturally from the chosen research design:
          </p>
          <div className="space-y-6">
            {studyLimitations.map((item) => (
              <div key={item.title}>
                <h3 className="text-2xl font-serif text-thought mb-2">{item.title}</h3>
                <p className="text-thought/75 text-lg leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="text-thought/75 text-lg leading-relaxed mt-8">
            These limitations define the boundaries within which the findings of the study are interpreted and
            applied.
          </p>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-12">
          <h2 className="text-3xl font-serif text-thought mb-6">Future Directions</h2>
          <p className="text-thought/75 text-lg leading-relaxed mb-6">
            Future research building on this work may explore:
          </p>
          <ul className="space-y-3">
            {futureDirections.map((direction) => (
              <li key={direction} className="text-thought/80 text-lg leading-relaxed">
                {direction}
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-thought/10 bg-thought text-white p-8 md:p-10">
          <h2 className="text-3xl font-serif mb-5">Closing</h2>
          <p className="text-white text-lg leading-relaxed">
            Recognising these boundaries ensures that the research remains transparent, rigorous, and open to further
            development in understanding how organisations function under pressure and how they can progressively
            strengthen their operating maturity.
          </p>
        </section>
      </div>
    </main>
  )
}


