'use client'

import { updateSiteSettings } from "@/app/actions"
import { useFormStatus } from "react-dom"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-action text-white px-6 py-2 font-medium hover:bg-action/90 transition-colors disabled:opacity-50"
    >
      {pending ? 'Saving...' : 'Save Changes'}
    </button>
  )
}

export default function SettingsForm({ 
  heroStatement, 
  pillarsDescription,
  aboutBio
}: { 
  heroStatement: string
  pillarsDescription: string
  aboutBio: string
}) {
  return (
    <form action={updateSiteSettings} className="space-y-8 bg-white p-8 border border-warmth/20">
      <div>
        <label className="block text-thought font-medium mb-2">Hero Statement</label>
        <textarea 
          name="hero_statement" 
          defaultValue={heroStatement}
          rows={3}
          className="w-full p-3 border border-warmth/30 focus:border-thought outline-none"
        />
        <p className="text-sm text-thought/60 mt-1">This text appears prominently on the home page.</p>
      </div>

      <div>
        <label className="block text-thought font-medium mb-2">Pillars (JSON Array)</label>
        <textarea 
          name="pillars_description" 
          defaultValue={pillarsDescription}
          rows={6}
          className="w-full p-3 border border-warmth/30 focus:border-thought outline-none font-mono text-sm"
        />
        <p className="text-sm text-thought/60 mt-1">Must be a valid JSON array of strings.</p>
      </div>

      <div>
        <label className="block text-thought font-medium mb-2">About Bio</label>
        <textarea 
          name="about_bio" 
          defaultValue={aboutBio}
          rows={5}
          className="w-full p-3 border border-warmth/30 focus:border-thought outline-none"
        />
        <p className="text-sm text-thought/60 mt-1">Short biography displayed on the Home page.</p>
      </div>

      <SubmitButton />
    </form>
  )
}
