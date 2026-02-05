'use client'

import { createPost, updatePost } from "@/app/actions"
import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-action text-white px-8 py-3 font-medium hover:bg-action/90 transition-colors disabled:opacity-50"
    >
      {pending ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
    </button>
  )
}

interface PostFormProps {
  post?: {
    id: string
    title: string
    category: string
    content: string
    published: boolean
  }
  categories: string[]
}

export default function PostForm({ post, categories }: PostFormProps) {
  const router = useRouter()
  const isEditing = !!post
  
  // Wrapper to handle update with ID or create
  const action = isEditing ? updatePost.bind(null, post.id) : createPost

  return (
    <form action={async (formData) => {
        await action(formData)
        router.push('/admin/writing')
    }} className="space-y-6 bg-white p-8 border border-warmth/20">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-thought font-medium mb-2">Title</label>
          <input 
            type="text" 
            name="title" 
            defaultValue={post?.title}
            required
            className="w-full p-3 border border-warmth/30 focus:border-thought outline-none"
          />
        </div>

        <div>
          <label className="block text-thought font-medium mb-2">Category</label>
          <select 
            name="category" 
            defaultValue={post?.category}
            required
            className="w-full p-3 border border-warmth/30 focus:border-thought outline-none bg-white"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-thought font-medium mb-2">Content (Rich Text / HTML)</label>
        <textarea 
          name="content" 
          defaultValue={post?.content}
          required
          rows={12}
          className="w-full p-3 border border-warmth/30 focus:border-thought outline-none font-mono text-sm"
        />
        <p className="text-sm text-thought/60 mt-1">Supports HTML or Markdown (depending on renderer).</p>
      </div>

      <div className="flex items-center space-x-3">
        <input 
          type="checkbox" 
          name="published" 
          id="published" 
          defaultChecked={post?.published}
          className="h-5 w-5 text-action border-warmth/30 rounded focus:ring-action"
        />
        <label htmlFor="published" className="text-thought font-medium select-none">Publish immediately</label>
      </div>

      <div className="pt-4 border-t border-warmth/20">
        <SubmitButton isEditing={isEditing} />
      </div>
    </form>
  )
}
