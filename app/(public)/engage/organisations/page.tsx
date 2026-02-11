import Link from "next/link"
import { ArrowRight } from "lucide-react"
import EditablePageContent from "@/components/EditablePageContent"
import { getEditablePage } from "@/lib/editable-pages"

const audiencePoints = [
  "Operate in fast-changing or high-pressure environments",
  "Experience gaps between leadership intent and team behaviour",
  "See capable people underperform in critical situations",
  "Want to better leverage Cognitive Diversity and Neurodiversity",
  "Seek deeper organisational coherence rather than superficial interventions",
]

export default async function EngageOrganisationsPage() {
  const editablePage = await getEditablePage("engage/organisations")
  if (editablePage) {
    return <EditablePageContent title={editablePage.title} content={editablePage.content} />
  }

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">
          Strengthening the Dimensions that Shape Organisational Response
        </h1>

        <div className="space-y-6 text-thought/75 text-lg leading-relaxed max-w-4xl mb-14">
          <p>
            Organisations are living systems. Their real strengths and weaknesses become visible under stress,
            ambiguity, and disruption.
          </p>
          <p>
            Vivartana works with organisations to strengthen the underlying dimensions that determine how people
            behave in such moments, especially how leadership behaviour, role alignment, and Cognitive Diversity and
            Neurodiversity influence organisational response.
          </p>
        </div>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-6">What This Engagement Is About</h2>
          <div className="space-y-4 text-thought/75 text-lg leading-relaxed mb-6">
            <p>This is not about fixing culture.</p>
            <p>This is not about training individuals.</p>
            <p>This is not about introducing new processes.</p>
          </div>
          <p className="text-lg text-thought leading-relaxed font-medium">
            This is about strengthening the organisational properties that determine behaviour when the organisation is
            tested.
          </p>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-12">
          <h2 className="text-3xl font-serif text-thought mb-6">Who This Is For</h2>
          <p className="text-lg text-thought/75 leading-relaxed mb-6">
            This engagement is particularly relevant for organisations that:
          </p>
          <ul className="space-y-3">
            {audiencePoints.map((point) => (
              <li key={point} className="text-thought/80 text-lg leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
        </section>

        <div className="border border-thought/10 bg-thought text-white p-8 md:p-10">
          <h2 className="text-3xl font-serif mb-4">Call to Action</h2>
          <p className="text-white text-lg leading-relaxed mb-8">
            If you are curious about how your organisation truly behaves when tested, Vivartana would be glad to begin
            with an ORI Scan™.
          </p>
          <Link
            href="/contact"
            className="cta-button px-7 py-4 text-base"
          >
            Start the conversation <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  )
}

