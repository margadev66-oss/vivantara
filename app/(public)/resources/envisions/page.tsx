import EditablePageContent from "@/components/EditablePageContent"
import { getEditablePage } from "@/lib/editable-pages"
import Image from "next/image"

const reflections = [
  "How early life environments influence adult behaviour in teams and leadership",
  "How societal norms quietly shape organisational culture",
  "How cognitive and behavioural patterns travel from homes to workplaces",
  "How stress reveals the underlying coherence - or incoherence - in human systems",
  "How clarity can emerge when we learn to observe these patterns without judgement",
]

export default async function ResourcesEnvisionsPage() {
  const editablePage = await getEditablePage("resources/envisions")
  if (editablePage) {
    return <EditablePageContent title={editablePage.title} content={editablePage.content} />
  }

  return (
    <main className="relative min-h-screen bg-canvas pt-12 pb-24 px-6 overflow-hidden">
      <Image
        src="/assests/resoursces/bg.jpeg"
        alt="Resources envisions background image"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/34 via-canvas/56 to-canvas/76" />
      <div className="container mx-auto max-w-7xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">Vivartana enVisions</h1>

        <div className="space-y-6 text-thought/75 text-lg leading-relaxed max-w-4xl mb-14">
          <p>
            enVisions is a reflective thought series exploring how human behaviour patterns shape families, societies,
            and organisations.
          </p>
          <p>These writings do not present frameworks, methods, or solutions.</p>
          <p>
            They explore observations, questions, and patterns that often go unnoticed - until pressure exposes them.
          </p>
        </div>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-6">What these reflections explore</h2>
          <ul className="space-y-3">
            {reflections.map((item) => (
              <li key={item} className="text-thought/80 text-lg leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-5">Why this series exists</h2>
          <p className="text-thought/75 text-lg leading-relaxed mb-4">
            Before organisations can be understood, the people within them must be understood.
          </p>
          <p className="text-thought/75 text-lg leading-relaxed">
            Before systems can be redesigned, the human patterns that sustain them must be seen clearly.
          </p>
          <p className="text-thought/75 text-lg leading-relaxed mt-4">enVisions is a space to think about these patterns.</p>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-12">
          <h2 className="text-3xl font-serif text-thought mb-5">A continuing inquiry</h2>
          <p className="text-thought/75 text-lg leading-relaxed mb-3">
            From authoritarian parenting to leadership styles,
          </p>
          <p className="text-thought/75 text-lg leading-relaxed mb-3">from family dynamics to team behaviour,</p>
          <p className="text-thought/75 text-lg leading-relaxed mb-4">
            from societal conditioning to organisational response under pressure.
          </p>
          <p className="text-thought/75 text-lg leading-relaxed">
            These reflections trace the invisible threads that connect them.
          </p>
        </section>

        <section className="border border-thought/10 bg-thought text-white p-8 md:p-10">
          <h2 className="text-3xl font-serif mb-5">A quiet note</h2>
          <p className="text-white text-lg leading-relaxed mb-3">This is not a blog.</p>
          <p className="text-white text-lg leading-relaxed mb-3">Not research.</p>
          <p className="text-white text-lg leading-relaxed mb-3">Not consultancy material.</p>
          <p className="text-white text-lg leading-relaxed">Just a space to pause, observe, and think.</p>
        </section>
      </div>
    </main>
  )
}

