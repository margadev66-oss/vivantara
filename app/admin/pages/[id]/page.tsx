import { prisma } from "@/lib/prisma"
import PageForm from "../PageForm"
import { notFound } from "next/navigation"

export default async function EditPage({ params }: { params: { id: string } }) {
  const { id } = params
  
  const page = await prisma.page.findUnique({
    where: { id }
  })

  if (!page) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-serif text-thought mb-8">Edit Page Content</h1>
      <PageForm page={page} />
    </div>
  )
}
