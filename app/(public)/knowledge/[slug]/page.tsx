import { redirect } from "next/navigation"

export default async function KnowledgeSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  redirect(`/knowledge-assets/${slug}`)
}
