import { prisma } from "@/lib/prisma"

const DEFAULT_PAGE_MARKER = "This is the default content for"

function toPlainText(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
}

export async function getEditablePage(slug: string) {
  const page = await prisma.page.findUnique({ where: { slug } })
  if (!page) {
    return null
  }

  const plainText = toPlainText(page.content || "")
  if (!plainText || plainText.includes(DEFAULT_PAGE_MARKER)) {
    return null
  }

  return page
}
