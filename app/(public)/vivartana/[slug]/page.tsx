import { redirect } from "next/navigation"

const slugMap: Record<string, string> = {
  individuals: "individuals",
  organisations: "organisations",
  teams: "organisations",
  services: "services-overview",
  "how-vivartana-works": "how-it-works",
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
