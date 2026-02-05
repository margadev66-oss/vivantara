import { redirect } from "next/navigation"

const slugMap: Record<string, string> = {
  individuals: "for-individuals",
  organisations: "for-organisations",
  teams: "for-organisations",
  "how-vivartana-works": "engagement-models",
}

export default async function VivartanaSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const mapped = slugMap[slug]
  redirect(mapped ? `/engage/${mapped}` : "/engage")
}
