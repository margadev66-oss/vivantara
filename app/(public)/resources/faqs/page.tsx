import Link from "next/link"
import { ArrowRight } from "lucide-react"
import EditablePageContent from "@/components/EditablePageContent"
import { getEditablePage } from "@/lib/editable-pages"

const faqs = [
  {
    question: "What is Organisational Stress Response (OSR)?",
    answer:
      "Organisational Stress Response refers to how people within an organisation sense, interpret, coordinate, and hold together when the organisation is under pressure, ambiguity, or disruption. It reveals the underlying maturity of the organisation beyond processes and strategy.",
  },
  {
    question: "What is the ORI Scan™?",
    answer:
      "ORI Scan™ stands for Organisational Response Imaging. It is a proprietary diagnostic exercise used to understand how an organisation actually behaves under stress through structured conversations and observations.",
  },
  {
    question: "What is OOS™ (Organisational Operating System)?",
    answer:
      "OOS™ represents the current operating maturity of an organisation in how it responds to challenges and disruption. As organisations strengthen the dimensions revealed through the ORI Scan™, their OOS™ progressively matures.",
  },
  {
    question: "What is Antifragility and AAI™?",
    answer:
      "Antifragility is the state where an organisation not only withstands stress but grows stronger through it. The Antifragility Achievement Index (AAI™) indicates how well an organisation's current OOS™ supports coherent functioning under pressure.",
  },
  {
    question: "How is this different from consulting or training?",
    answer:
      "Vivartana does not focus on introducing new processes or conducting training programmes. The work focuses on strengthening the underlying organisational dimensions that shape behaviour when the organisation is tested.",
  },
  {
    question: "Why are Cognitive Diversity and Neurodiversity important here?",
    answer:
      "Different cognitive strengths become especially valuable under stress and ambiguity. Recognising and aligning these strengths to roles and situations can significantly improve how organisations function when tested.",
  },
  {
    question: "Who should consider engaging with Vivartana?",
    answer:
      "Organisations operating in fast-changing, high-pressure environments, or those experiencing gaps between leadership intent and team behaviour, often find this engagement particularly valuable.",
  },
  {
    question: "How long does an engagement typically last?",
    answer:
      "Engagements are iterative and unfold over time through repeated ORI Scan™ cycles, roadmap development, and ongoing transformation work.",
  },
  {
    question: "How can we begin?",
    answer:
      "The journey typically begins with an ORI Scan™ to understand how the organisation currently behaves under pressure.",
  },
]

export default async function ResourcesFaqsPage() {
  const editablePage = await getEditablePage("resources/faqs")
  if (editablePage) {
    return <EditablePageContent title={editablePage.title} content={editablePage.content} />
  }

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">Frequently Asked Questions</h1>

        <div className="space-y-5 mb-12">
          {faqs.map((item) => (
            <article key={item.question} className="border border-warmth/20 bg-white p-8 md:p-10">
              <h2 className="text-2xl font-serif text-thought mb-4">{item.question}</h2>
              <p className="text-thought/75 text-lg leading-relaxed">{item.answer}</p>
            </article>
          ))}
        </div>

        <section className="border border-thought/10 bg-thought text-white p-8 md:p-10">
          <h2 className="text-3xl font-serif mb-4">Ready to begin?</h2>
          <p className="text-white text-lg leading-relaxed mb-8">
            Start with a conversation to explore how your organisation behaves under pressure.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-action text-white px-7 py-4 text-base font-medium hover:bg-action/90 transition-colors"
          >
            Start the conversation <ArrowRight size={18} />
          </Link>
        </section>
      </div>
    </main>
  )
}
