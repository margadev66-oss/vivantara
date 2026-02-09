import Link from "next/link"
import { ArrowRight } from "lucide-react"
import EditablePageContent from "@/components/EditablePageContent"
import { getEditablePage } from "@/lib/editable-pages"

const engagementAreas = [
  {
    title: "Leaders navigating pressure",
    points: [
      "When leadership responsibility begins to feel heavier than clarity.",
      "Decision fatigue",
      "Role strain",
      "Leadership intent not translating into team behaviour",
      "The need for personal clarity before organisational action",
    ],
  },
  {
    title: "Teams facing ambiguity",
    points: [
      "When capable teams begin to lose coherence as uncertainty rises.",
      "Miscommunication under stress",
      "Coordination breakdowns",
      "Psychological safety concerns",
      "Drift between intent and behaviour",
    ],
  },
  {
    title: "Organisations under strain",
    points: [
      "When processes exist, but alignment weakens when things go wrong.",
      "Organisational Psyche Diagnostics",
      "OOS™ mapping and alignment assessment",
      "Culture and behavioural coherence under pressure",
      "Diagnostic-led interventions and workshops",
    ],
  },
  {
    title: "Individuals within organisational contexts",
    points: [
      "When stress at work begins to affect clarity, confidence, and direction.",
      "Coaching and counselling",
      "Fortitude MindShift journeys",
      "Navigating pressure with greater alignment",
    ],
  },
]

const typicalInclusions = [
  "Diagnostic conversations and assessments",
  "Leadership and team interventions",
  "Workshops and guided sessions",
  "One-on-one coaching and counselling",
  "Long-term alignment journeys",
]

export default async function EngageServicesOverviewPage() {
  const editablePage = await getEditablePage("engage/services-overview")
  if (editablePage) {
    return <EditablePageContent title={editablePage.title} content={editablePage.content} />
  }

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">How We Help</h1>

        <div className="space-y-6 text-thought/75 text-lg leading-relaxed max-w-4xl mb-14">
          <p>Misalignment rarely appears as a single problem.</p>
          <p>
            It shows up as tension in leaders, confusion in teams, cultural drift in organisations, and quiet stress
            in individuals trying to hold it all together.
          </p>
          <p>Vivartana works at the point where these experiences meet.</p>
        </div>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-12">
          <h2 className="text-3xl font-serif text-thought mb-6">Where we engage</h2>
          <div className="space-y-8">
            {engagementAreas.map((area) => (
              <article key={area.title} className="border border-warmth/20 bg-canvas p-8 md:p-10">
                <h3 className="text-2xl font-serif text-thought mb-5">{area.title}</h3>
                <ul className="space-y-3">
                  {area.points.map((point) => (
                    <li key={point} className="text-thought/80 text-lg leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-12">
          <h2 className="text-3xl font-serif text-thought mb-6">What this work typically includes</h2>
          <ul className="space-y-3">
            {typicalInclusions.map((item) => (
              <li key={item} className="text-thought/80 text-lg leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-thought/10 bg-thought text-white p-8 md:p-10">
          <h2 className="text-3xl font-serif mb-5">A quiet note</h2>
          <p className="text-white text-lg leading-relaxed mb-8">
            This is not about quick fixes. It is about helping people and organisations understand how they truly
            behave under pressure - and realigning from there.
          </p>
          <Link
            href="/engage/how-it-works"
            className="cta-button h-10 gap-2 px-5 text-sm whitespace-nowrap sm:text-base"
          >
            Understand how this works <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </main>
  )
}
