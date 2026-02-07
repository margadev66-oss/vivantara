import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deletePost } from "@/app/actions"
import { Plus, Edit, Trash2 } from "lucide-react"

export default async function WritingPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-thought">Articles</h1>
        <Link 
          href="/admin/writing/new" 
          className="flex items-center space-x-2 bg-action text-white px-4 py-2 font-medium hover:bg-action/90 transition-colors"
        >
          <Plus size={18} />
          <span>New Post</span>
        </Link>
      </div>

      <div className="bg-white border border-warmth/20">
        <table className="w-full text-left">
          <thead className="bg-warmth/10 border-b border-warmth/20">
            <tr>
              <th className="p-4 font-serif text-thought">Title</th>
              <th className="p-4 font-serif text-thought">Category</th>
              <th className="p-4 font-serif text-thought">Status</th>
              <th className="p-4 font-serif text-thought text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-warmth/10 last:border-0 hover:bg-warmth/5">
                <td className="p-4 font-medium">{post.title}</td>
                <td className="p-4 text-thought/70">{post.category}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <Link 
                    href={`/admin/writing/${post.id}`}
                    className="inline-block p-2 text-thought/60 hover:text-action transition-colors"
                  >
                    <Edit size={18} />
                  </Link>
                  <form action={deletePost.bind(null, post.id)} className="inline-block">
                    <button className="p-2 text-thought/60 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-thought/60">
                  No posts found. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
