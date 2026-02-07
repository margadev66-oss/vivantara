'use client'

import { createPage } from "@/app/actions"
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
      {pending ? "Saving..." : "Create Page"}
    </button>
  )
}

export default function PageCreateForm() {
  const router = useRouter()

  return (
    <form
      action={async (formData) => {
        await createPage(formData)
        router.push('/admin/pages')
      }}
      className="space-y-6 bg-white p-8 border border-warmth/20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-thought font-medium mb-2">Page Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full p-3 border border-warmth/30 focus:border-thought outline-none"
          />
        </div>

        <div>
          <label className="block text-thought font-medium mb-2">Slug / Path</label>
          <input
            type="text"
            name="slug"
            required
            placeholder="example: resources/my-page"
            className="w-full p-3 border border-warmth/30 focus:border-thought outline-none font-mono text-sm"
          />
          <p className="text-sm text-thought/60 mt-1">
            Use URL path format without a leading slash.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-thought font-medium mb-2">Content (Rich Text / HTML)</label>
        <textarea
          name="content"
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
