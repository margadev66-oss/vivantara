import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Edit, FileText, Plus } from "lucide-react"

export default async function PagesIndex() {
  const pages = await prisma.page.findMany({
    orderBy: { slug: 'asc' }
  })

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-serif text-thought">Site Pages</h1>
          <p className="text-sm text-thought/60 mt-2">
            Use Sync Navigation for defaults or create additional pages manually.
          </p>
        </div>
        <Link
          href="/admin/pages/new"
          className="inline-flex items-center gap-2 bg-action text-white px-4 py-2 text-sm font-medium hover:bg-action/90 transition-colors w-fit"
        >
          <Plus size={16} />
          <span>New Page</span>
        </Link>
      </div>
      <div className="bg-white border border-warmth/20">
        <table className="w-full text-left">
          <thead className="bg-warmth/10 border-b border-warmth/20">
            <tr>
              <th className="p-4 font-serif text-thought">Page Title</th>
              <th className="p-4 font-serif text-thought">Slug / Path</th>
              <th className="p-4 font-serif text-thought text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-b border-warmth/10 last:border-0 hover:bg-warmth/5">
                <td className="p-4 font-medium flex items-center gap-2">
                  <FileText size={16} className="text-thought/40" />
                  {page.title}
                </td>
                <td className="p-4 text-thought/70 font-mono text-sm">/{page.slug}</td>
                <td className="p-4 text-right">
                  <Link 
                    href={`/admin/pages/${page.id}`}
                    className="inline-flex items-center space-x-1 text-action hover:text-action/80 font-medium text-sm"
                  >
                    <Edit size={16} />
                    <span>Edit Content</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
