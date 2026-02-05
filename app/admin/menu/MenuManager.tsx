'use client'

import { updateMenuItem } from "@/app/actions"
import { useState } from "react"
import { Edit2, Check, X } from "lucide-react"

// Define a type that matches the Prisma result structure
interface MenuChild {
  id: string
  title: string
  parentId: string | null
  // children might be missing if not fetched
}

interface MenuItem extends MenuChild {
  children: MenuChild[]
}

function EditableItem({ item, level = 0 }: { item: MenuChild, level?: number }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(item.title)

  return (
    <div className={`py-3 px-4 border-b border-warmth/10 hover:bg-warmth/5 flex items-center justify-between ${level > 0 ? 'pl-12 bg-gray-50' : ''}`}>
      {isEditing ? (
        <form action={async (formData) => {
            await updateMenuItem(item.id, formData)
            setIsEditing(false)
        }} className="flex items-center space-x-2 flex-1">
          <input 
            name="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="p-1 border border-warmth/30 rounded focus:border-thought outline-none flex-1 max-w-sm"
          />
          <button type="submit" className="text-green-600 hover:text-green-700 p-1">
            <Check size={18} />
          </button>
          <button type="button" onClick={() => setIsEditing(false)} className="text-red-500 hover:text-red-600 p-1">
            <X size={18} />
          </button>
        </form>
      ) : (
        <span className={`font-medium ${level === 0 ? 'text-thought' : 'text-thought/70'}`}>
          {item.title}
        </span>
      )}

      {!isEditing && (
        <button onClick={() => setIsEditing(true)} className="text-thought/40 hover:text-action p-2">
          <Edit2 size={16} />
        </button>
      )}
    </div>
  )
}

export default function MenuManager({ items }: { items: MenuItem[] }) {
  return (
    <div className="bg-white border border-warmth/20 rounded shadow-sm">
      {items.map((item) => (
        <div key={item.id}>
          <EditableItem item={item} />
          {item.children.map((child) => (
            <EditableItem key={child.id} item={child} level={1} />
          ))}
        </div>
      ))}
    </div>
  )
}