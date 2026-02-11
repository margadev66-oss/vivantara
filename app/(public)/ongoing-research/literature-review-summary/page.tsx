import EditablePageContent from "@/components/EditablePageContent"
import { getEditablePage } from "@/lib/editable-pages"
import Image from "next/image"

const plannedAreas = [
  "Organisational behaviour and team dynamics",
  "Leadership and sensemaking in uncertain situations",
  "Organisational resilience and adaptability",
  "Cognitive Diversity and Neurodiversity in performance",
  "Quality management and process excellence",
]

export default async function OngoingResearchLiteratureReviewSummaryPage() {
  const editablePage = await getEditablePage("ongoing-research/literature-review-summary")
  if (editablePage) {
    return <EditablePageContent title={editablePage.title} content={editablePage.content} />
  }

  return (
    <main className="relative min-h-screen bg-canvas pt-12 pb-24 px-6 overflow-hidden">
      <Image
        src="/assests/research/bg2.jpeg"
        alt="Literature review background image"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/48 via-canvas/70 to-canvas/86" />
      <div className="container mx-auto max-w-7xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">Planned Literature Review</h1>

        <div className="space-y-6 text-thought/75 text-lg leading-relaxed max-w-4xl mb-14">
          <p>
            The doctoral research informing Vivartana&apos;s work is in its early stages. The formal literature review
            is yet to be undertaken.
          </p>
          <p>
            However, the research is expected to engage with established bodies of knowledge in organisational
            behaviour, leadership, resilience, cognitive diversity, and quality management to better understand how
            organisations function under stress and disruption.
          </p>
        </div>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-6">Areas the Research Intends to Explore</h2>
          <p className="text-thought/75 text-lg leading-relaxed mb-6">
            The literature review will examine studies related to:
          </p>
          <ul className="space-y-3">
            {plannedAreas.map((area) => (
              <li key={area} className="text-thought/80 text-lg leading-relaxed">
                {area}
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-12">
          <h2 className="text-3xl font-serif text-thought mb-5">Purpose of the Review</h2>
          <p className="text-thought/75 text-lg leading-relaxed">
            The aim of the literature review will be to identify how existing research explains behaviour at the level
            of individuals and teams, and to explore the relative gap in understanding how stress reveals deeper
            organisational properties.
          </p>
        </section>

        <section className="border border-thought/10 bg-thought text-white p-8 md:p-10">
          <h2 className="text-3xl font-serif mb-5">Closing</h2>
          <p className="text-white text-lg leading-relaxed">
            This review will form the academic foundation for the ongoing research and its practical applications
            through Vivartana.
          </p>
        </section>
      </div>
    </main>
  )
}


