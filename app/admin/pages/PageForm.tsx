'use client'

import { updatePage } from "@/app/actions"
import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-action text-white px-8 py-3 font-medium hover:bg-action/90 transition-colors disabled:opacity-50"
    >
      {pending ? 'Saving...' : 'Update Page'}
    </button>
  )
}

interface PageFormProps {
  page: {
    id: string
    title: string
    slug: string
    content: string
  }
}

export default function PageForm({ page }: PageFormProps) {
  const router = useRouter()
  
  return (
    <form action={async (formData) => {
        await updatePage(page.id, formData)
        router.push('/admin/pages')
    }} className="space-y-6 bg-white p-8 border border-warmth/20">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-thought font-medium mb-2">Page Title</label>
          <input 
            type="text" 
            name="title" 
            defaultValue={page.title}
            required
            className="w-full p-3 border border-warmth/30 focus:border-thought outline-none"
          />
        </div>

        <div>
          <label className="block text-thought font-medium mb-2">Slug (Read Only)</label>
          <input 
            type="text" 
            value={page.slug}
            disabled
            className="w-full p-3 border border-warmth/10 bg-gray-50 text-thought/60 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-thought font-medium mb-2">Content (Rich Text / HTML)</label>
        <textarea 
          name="content" 
          defaultValue={page.content}
          required
          rows={20}
          className="w-full p-3 border border-warmth/30 focus:border-thought outline-none font-mono text-sm"
        />
        <p className="text-sm text-thought/60 mt-1">
          Supports HTML. Use tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt; to structure your content.
        </p>
      </div>

      <div className="pt-4 border-t border-warmth/20">
        <SubmitButton />
      </div>
    </form>
  )
}
