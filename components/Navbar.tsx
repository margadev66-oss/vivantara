import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

export default async function Navbar() {
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
    <nav className="border-b border-warmth/20 bg-canvas sticky top-0 z-50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden mix-blend-multiply">
            <Image 
              src="/logo.png" 
              alt="Vivartana Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-serif text-2xl font-bold text-thought tracking-tight group-hover:text-action transition-colors">
            Vivartana
          </span>
        </Link>
        
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <div key={item.id} className="relative group">
              <Link 
                href={item.url || '#'} 
                className="text-thought/80 hover:text-action transition-colors text-sm font-medium uppercase tracking-wider"
              >
                {item.title}
              </Link>
              
              {item.children.length > 0 && (
                <div className="absolute left-0 mt-2 w-56 bg-white border border-warmth/20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible">
                  {item.children.map((child) => (
                    <Link
                      key={child.id}
                      href={child.url || '#'}
                      className="block px-4 py-3 text-sm text-thought hover:bg-warmth/10 border-b border-warmth/10 last:border-0"
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <Link 
          href="/contact" 
          className="bg-action text-white px-6 py-2 rounded-none text-sm font-medium hover:bg-action/90 transition-colors"
        >
          Start a Conversation
        </Link>
      </div>
    </nav>
  )
}
