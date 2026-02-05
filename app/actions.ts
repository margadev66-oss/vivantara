'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { sanitizeRichText } from "@/lib/sanitize"

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

async function generateUniquePostSlug(title: string) {
  const baseSlug = slugify(title) || `post-${Date.now()}`
  let slug = baseSlug
  let suffix = 2

  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix}`
    suffix += 1
  }

  return slug
}

export async function updateSiteSettings(formData: FormData) {
  await requireAdmin()
  const heroStatement = formData.get('hero_statement') as string
  const pillarsJson = formData.get('pillars_description') as string
  const aboutBio = formData.get('about_bio') as string

  if (heroStatement) {
    await prisma.siteSetting.upsert({
      where: { key: 'hero_statement' },
      update: { value: heroStatement },
      create: { key: 'hero_statement', value: heroStatement }
    })
  }

  if (aboutBio) {
    await prisma.siteSetting.upsert({
      where: { key: 'about_bio' },
      update: { value: aboutBio },
      create: { key: 'about_bio', value: aboutBio }
    })
  }

  if (pillarsJson) {
    // Validate JSON
    try {
      JSON.parse(pillarsJson)
      await prisma.siteSetting.upsert({
        where: { key: 'pillars_description' },
        update: { value: pillarsJson },
        create: { key: 'pillars_description', value: pillarsJson }
      })
    } catch (e) {
      throw new Error("Invalid JSON for pillars")
    }
  }

  revalidatePath('/')
  revalidatePath('/admin/settings')
}

export async function createPost(formData: FormData) {
  await requireAdmin()
  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const content = sanitizeRichText(formData.get('content') as string)
  const published = formData.get('published') === 'on'
  const slug = await generateUniquePostSlug(title)

  await prisma.post.create({
    data: {
      title,
      slug,
      category,
      content,
      published,
    }
  })

  revalidatePath('/writing')
  revalidatePath('/resources/articles')
  revalidatePath('/admin/writing')
}

export async function deletePost(id: string) {
  await requireAdmin()
  await prisma.post.delete({ where: { id } })
  revalidatePath('/writing')
  revalidatePath('/resources/articles')
  revalidatePath('/admin/writing')
}

export async function updateMenuItem(id: string, formData: FormData) {
  await requireAdmin()
  const title = formData.get('title') as string
  
  if (title) {
    await prisma.menuItem.update({
      where: { id },
      data: { title }
    })
  }

  revalidatePath('/')
  revalidatePath('/admin/menu')
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdmin()
  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const content = sanitizeRichText(formData.get('content') as string)
  const published = formData.get('published') === 'on'

  await prisma.post.update({
    where: { id },
    data: {
      title,
      category,
      content,
      published,
    }
  })

  revalidatePath('/writing')
  revalidatePath('/resources/articles')
  revalidatePath('/admin/writing')
}

export async function updatePage(id: string, formData: FormData) {
  await requireAdmin()
  const title = formData.get('title') as string
  const content = sanitizeRichText(formData.get('content') as string)

  await prisma.page.update({
    where: { id },
    data: {
      title,
      content,
    }
  })

  revalidatePath('/')
  revalidatePath('/admin/pages')
}

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  await prisma.contactSubmission.create({
    data: {
      name,
      email,
      subject,
      message,
    }
  })

  revalidatePath('/admin/enquiries')
}

export async function markEnquiryRead(id: string) {
  await requireAdmin()
  await prisma.contactSubmission.update({
    where: { id },
    data: { read: true }
  })
  revalidatePath('/admin/enquiries')
}
