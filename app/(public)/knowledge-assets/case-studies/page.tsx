import EditablePageContent from "@/components/EditablePageContent"
import { getEditablePage } from "@/lib/editable-pages"
import Image from "next/image"

const caseStudies = [
  {
    title: "Case 1 - When Capable People Look Average",
    paragraphs: [
      "Two employees were given the same critical task during a time-sensitive situation.",
      "One excelled. The other struggled.",
      "Both were intelligent. Both were experienced.",
      "The difference lay in cognitive strengths, one was strong in pattern recognition, the other in verbal reasoning. The task required the former.",
      "The issue was not capability. It was role-cognition mismatch revealed under pressure.",
    ],
  },
  {
    title: "Case 2 - Leadership Intent, Team Confusion",
    paragraphs: [
      "A leadership team believed they had communicated priorities clearly during a period of disruption.",
      "Teams, however, interpreted the situation very differently and worked at cross-purposes.",
      "Under stress, the gap between leadership intent and team behaviour widened, exposing weaknesses in psychosocial alignment and organisational coherence.",
    ],
  },
  {
    title: "Case 3 - Psychological Safety Collapse During Crisis",
    paragraphs: [
      "In routine operations, a team functioned smoothly.",
      "During a crisis, blame increased, communication reduced, and decision quality dropped sharply.",
      "The organisation did not lose competence. It lost the ability to coordinate under stress.",
    ],
  },
  {
    title: "Case 4 - Hidden Strengths in Neurodiverse Profiles",
    paragraphs: [
      "During a complex operational challenge, individuals who were otherwise considered different or quiet became the most effective problem-solvers.",
      "Their strengths in systems thinking and deep focus became invaluable when ambiguity increased.",
      "What appeared ordinary in routine times became critical under pressure.",
    ],
  },
]

export default async function KnowledgeAssetsCaseStudiesPage() {
  const editablePage = await getEditablePage("knowledge-assets/case-studies")
  if (editablePage) {
    return <EditablePageContent title={editablePage.title} content={editablePage.content} />
  }

  return (
    <main className="relative min-h-screen bg-canvas pt-12 pb-24 px-6 overflow-hidden">
      <Image
        src="/assests/knowledge-assests/bg3.jpeg"
        alt="Case studies background image"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/34 via-canvas/54 to-canvas/74" />
      <div className="container mx-auto max-w-7xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">
          Observed Patterns from Organisations Under Pressure
        </h1>

        <div className="space-y-6 text-thought/75 text-lg leading-relaxed max-w-4xl mb-14">
          <p>
            The following situations are drawn from real organisational experiences. Names and contexts are
            generalised, but the behavioural patterns are authentic.
          </p>
          <p>
            These examples illustrate how organisations reveal their true operating maturity when tested.
          </p>
        </div>

        <section className="space-y-8 mb-12">
          {caseStudies.map((caseStudy) => (
            <article key={caseStudy.title} className="border border-warmth/20 bg-white p-8 md:p-10">
              <h2 className="text-3xl font-serif text-thought mb-5">{caseStudy.title}</h2>
              <div className="space-y-4 text-thought/75 text-lg leading-relaxed">
                {caseStudy.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="border border-thought/10 bg-thought text-white p-8 md:p-10">
          <h2 className="text-3xl font-serif mb-5">Closing</h2>
          <div className="space-y-4 text-white text-lg leading-relaxed">
            <p>These patterns are not isolated incidents.</p>
            <p>
              They are signals of how an organisation&apos;s underlying dimensions shape behaviour when tested.
            </p>
            <p>Understanding these patterns is the first step toward strengthening organisational response.</p>
          </div>
        </section>
      </div>
    </main>
  )
}

