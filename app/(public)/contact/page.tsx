import { Facebook, Linkedin } from "lucide-react"
import ContactForm from "./ContactForm"
import { getEditablePage } from "@/lib/editable-pages"

export default async function ContactPage() {
  const editablePage = await getEditablePage("contact")

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-serif text-thought mb-8">Start the Conversation</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white p-8 border border-warmth/20 h-fit">
            {editablePage ? (
              <>
                <h2 className="text-3xl font-serif text-thought mb-5">{editablePage.title}</h2>
                <div
                  className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-thought prose-p:text-thought/85 prose-li:text-thought/85 prose-a:text-action"
                  dangerouslySetInnerHTML={{ __html: editablePage.content }}
                />
              </>
            ) : (
              <>
                <h2 className="text-3xl font-serif text-thought mb-5">What to Expect</h2>
                <p className="text-thought/75 text-lg leading-relaxed mb-8">
                  An initial conversation to understand your context, challenges, and interest areas. From there, the
                  possibility of beginning with an ORI Scan (Organisational Response Imaging) can be explored.
                </p>

                <h3 className="text-2xl font-serif text-thought mb-4">Reach Out</h3>
                <ul className="space-y-3 text-lg">
                  <li className="text-thought/80">
                    Email:{" "}
                    <a href="mailto:aumlaan@vivartana.com" className="text-action hover:underline">
                      aumlaan@vivartana.com
                    </a>
                  </li>
                  <li className="text-thought/80">
                    <span className="inline-flex items-center gap-2">
                      <Linkedin size={16} className="text-action" />
                      <span>LinkedIn:</span>
                      <a
                        href="https://www.linkedin.com/in/aumlan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-action hover:underline"
                      >
                        linkedin.com/in/aumlan
                      </a>
                    </span>
                  </li>
                  <li className="text-thought/80">
                    <span className="inline-flex items-center gap-2">
                      <Facebook size={16} className="text-action" />
                      <span>Facebook:</span>
                      <a
                        href="https://www.facebook.com/aumlaan/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-action hover:underline"
                      >
                        facebook.com/aumlaan
                      </a>
                    </span>
                  </li>
                </ul>

                <p className="text-thought font-medium text-lg leading-relaxed mt-10">
                  Clarity under pressure starts with a simple conversation.
                </p>
              </>
            )}
          </section>

          <section className="bg-white p-8 border border-warmth/20">
            <h2 className="text-3xl font-serif text-thought mb-6">Send a Message</h2>
            <ContactForm />
          </section>
        </div>
      </div>
    </main>
  )
}
