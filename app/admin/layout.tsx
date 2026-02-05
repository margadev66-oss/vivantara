import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Settings, Menu, PenTool, LogOut, Mail, FileText } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/settings", label: "Global Settings", icon: Settings },
    { href: "/admin/pages", label: "Pages Content", icon: FileText },
    { href: "/admin/menu", label: "Menu Management", icon: Menu },
    { href: "/admin/writing", label: "Writing / Blog", icon: PenTool },
    { href: "/admin/enquiries", label: "Enquiries", icon: Mail },
  ]

  return (
    <div className="min-h-screen bg-canvas flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-warmth/20 bg-white flex flex-col">
        <div className="p-6 border-b border-warmth/20">
          <h2 className="text-xl font-serif font-bold text-thought">Vivartana Admin</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 text-thought/80 hover:bg-warmth/10 hover:text-action rounded-none transition-colors"
            >
              <item.icon size={18} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-warmth/20">
          <Link
            href="/api/auth/signout"
            className="flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            <span className="font-medium">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
