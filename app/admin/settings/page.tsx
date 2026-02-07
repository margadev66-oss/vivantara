import { prisma } from "@/lib/prisma"
import { DEFAULT_HOME_CONTENT, mergeHomeContent, type HomeContent } from "@/lib/home-content"
import SettingsForm from "./SettingsForm"

export default async function SettingsPage() {
  const heroSetting = await prisma.siteSetting.findUnique({ where: { key: 'hero_statement' } })
  const pillarsSetting = await prisma.siteSetting.findUnique({ where: { key: 'pillars_description' } })
  const bioSetting = await prisma.siteSetting.findUnique({ where: { key: 'about_bio' } })
  const homeContentSetting = await prisma.siteSetting.findUnique({ where: { key: 'home_content' } })

  const heroStatement = heroSetting?.value || ""
  const pillarsDescription = pillarsSetting?.value || "[]"
  const aboutBio = bioSetting?.value || ""
  let homeContent = JSON.stringify(DEFAULT_HOME_CONTENT, null, 2)

  if (homeContentSetting?.value) {
    try {
      const parsedHomeContent = JSON.parse(homeContentSetting.value) as Partial<HomeContent>
      const isLegacyContent =
        typeof parsedHomeContent !== "object" ||
        parsedHomeContent === null ||
        !parsedHomeContent.hero ||
        !parsedHomeContent.why_this_matters ||
        !parsedHomeContent.how_we_work

      homeContent = JSON.stringify(
        isLegacyContent ? DEFAULT_HOME_CONTENT : mergeHomeContent(parsedHomeContent),
        null,
        2
      )
    } catch {
      homeContent = JSON.stringify(DEFAULT_HOME_CONTENT, null, 2)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-serif text-thought mb-8">Global Settings</h1>
      <SettingsForm
        heroStatement={heroStatement}
        pillarsDescription={pillarsDescription}
        aboutBio={aboutBio}
        homeContent={homeContent}
      />
    </div>
  )
}
