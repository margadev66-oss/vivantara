import { prisma } from "@/lib/prisma"
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
      
      <MenuManager items={menuItems} />
    </div>
  )
}
