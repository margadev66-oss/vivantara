import { prisma } from "@/lib/prisma"
import { syncDefaultStructure } from "@/app/actions"
import MenuManager from "./MenuManager"

export default async function MenuPage() {
  const menuItems = await prisma.menuItem.findMany({
    where: { parentId: null },
    include: {
      children: {
        orderBy: { order: 'asc' }
      }
    },
    orderBy: { order: 'asc' }
  })

  return (
    <div>
      <h1 className="text-3xl font-serif text-thought mb-8">Menu Management</h1>
      <p className="text-thought/60 mb-6">Edit the titles of the navigation menu items. Drag-and-drop ordering is coming soon.</p>

      <div className="bg-white border border-warmth/20 p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-serif text-thought">Sync Default Structure</h2>
          <p className="text-sm text-thought/60">
            Rebuilds the navigation to the updated sitemap (Engage with Us, Knowledge Assets, Ongoing Research, Resources, Contact)
            including Engage children (Services Overview, How It Works),
            and ensures all default pages exist. Existing menu items will be replaced.
          </p>
        </div>
        <form action={syncDefaultStructure}>
          <button className="bg-action text-white px-5 py-2 text-sm font-medium hover:bg-action/90 transition-colors">
            Sync Navigation
          </button>
        </form>
      </div>
      
      <MenuManager items={menuItems} />
    </div>
  )
}
