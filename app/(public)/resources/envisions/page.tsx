import EditablePageContent from "@/components/EditablePageContent"
import { getEditablePage } from "@/lib/editable-pages"

const envisionedShifts = [
  "Capable people are recognised for the right strengths",
  "Leadership intent translates clearly into team behaviour",
  "Cognitive Diversity and Neurodiversity are seen as performance assets",
  "Teams coordinate calmly when ambiguity rises",
  "Stress reveals clarity instead of confusion",
]

export default async function ResourcesEnvisionsPage() {
  const editablePage = await getEditablePage("resources/envisions")
  if (editablePage) {
    return <EditablePageContent title={editablePage.title} content={editablePage.content} />
  }

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">What Vivartana Envisions</h1>

        <div className="space-y-6 text-thought/75 text-lg leading-relaxed max-w-4xl mb-14">
          <p>Vivartana&apos;s work is guided by a simple belief:</p>
          <p>Organisations can learn to function coherently even when they are under pressure.</p>
        </div>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-6">The Possibility</h2>
          <p className="text-thought/75 text-lg leading-relaxed mb-6">An organisation where:</p>
          <ul className="space-y-3">
            {envisionedShifts.map((item) => (
              <li key={item} className="text-thought/80 text-lg leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-10">
          <h2 className="text-3xl font-serif text-thought mb-5">The Shift</h2>
          <p className="text-thought/75 text-lg leading-relaxed">
            From focusing only on processes and performance metrics to understanding the deeper organisational
            properties that shape behaviour when things go wrong.
          </p>
        </section>

        <section className="border border-warmth/20 bg-white p-8 md:p-10 mb-12">
          <h2 className="text-3xl font-serif text-thought mb-5">The Long-Term View</h2>
          <p className="text-thought/75 text-lg leading-relaxed">
            As organisations strengthen their Adaptive Business Operating System (ABOS), they move closer to
            antifragility, the ability to grow stronger through stress and disruption rather than merely survive it.
          </p>
        </section>

        <section className="border border-thought/10 bg-thought text-white p-8 md:p-10">
          <h2 className="text-3xl font-serif mb-5">Closing</h2>
          <p className="text-warmth/90 text-lg leading-relaxed mb-4">This is not an idealistic vision.</p>
          <p className="text-warmth/90 text-lg leading-relaxed">
            It is a practical possibility when organisations begin to understand how they truly behave under pressure.
          </p>
        </section>
      </div>
    </main>
  )
}
