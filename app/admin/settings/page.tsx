import { prisma } from "@/lib/prisma"
import SettingsForm from "./SettingsForm"

export default async function SettingsPage() {
  const heroSetting = await prisma.siteSetting.findUnique({ where: { key: 'hero_statement' } })
  const pillarsSetting = await prisma.siteSetting.findUnique({ where: { key: 'pillars_description' } })
  const bioSetting = await prisma.siteSetting.findUnique({ where: { key: 'about_bio' } })

  const heroStatement = heroSetting?.value || ""
  const pillarsDescription = pillarsSetting?.value || "[]"
  const aboutBio = bioSetting?.value || ""

  return (
    <div>
      <h1 className="text-3xl font-serif text-thought mb-8">Global Settings</h1>
      <SettingsForm 
        heroStatement={heroStatement} 
        pillarsDescription={pillarsDescription}
        aboutBio={aboutBio}
      />
    </div>
  )
}
