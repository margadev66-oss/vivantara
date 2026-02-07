export default function EditablePageContent({
  title,
  content,
}: {
  title: string
  content: string
}) {
  return (
    <main className="min-h-screen page-wrap px-6 pb-24 pt-12">
      <div className="container mx-auto max-w-4xl">
        <section className="section-card rounded-2xl p-8 md:p-10">
          <h1 className="text-4xl md:text-6xl font-serif text-thought mb-10">{title}</h1>
          <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-thought prose-p:text-thought/85 prose-li:text-thought/85 prose-a:text-action"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      </div>
    </main>
  )
}
