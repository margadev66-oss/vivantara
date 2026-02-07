'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { sanitizeRichText } from "@/lib/sanitize"
import {
  SITE_NAVIGATION,
  getDefaultEditablePages,
  getDefaultPageContent,
} from "@/lib/site-structure"

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

function normalizePageSlug(input: string) {
  return input
    .split("/")
    .map((segment) => slugify(segment))
    .filter(Boolean)
    .join("/")
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
  const homeContentJson = formData.get('home_content') as string

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

  if (homeContentJson) {
    try {
      JSON.parse(homeContentJson)
      await prisma.siteSetting.upsert({
        where: { key: 'home_content' },
        update: { value: homeContentJson },
        create: { key: 'home_content', value: homeContentJson }
      })
    } catch (e) {
      throw new Error("Invalid JSON for home content")
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

export async function syncDefaultStructure() {
  await requireAdmin()

  await prisma.menuItem.deleteMany({})

  for (let i = 0; i < SITE_NAVIGATION.length; i++) {
    const item = SITE_NAVIGATION[i]

    if (item.children && item.basePath) {
      const parent = await prisma.menuItem.create({
        data: {
          title: item.title,
          order: i,
          url: item.url,
        },
      })

      for (let j = 0; j < item.children.length; j++) {
        const child = item.children[j]
        const fullPath = `/${item.basePath}/${child.slug}`

        await prisma.menuItem.create({
          data: {
            title: child.title,
            order: j,
            parentId: parent.id,
            url: fullPath,
          },
        })
      }

      continue
    }

    await prisma.menuItem.create({
      data: { title: item.title, order: i, url: item.url },
    })
  }

  const defaultPages = getDefaultEditablePages()
  for (const page of defaultPages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: {
        title: page.title,
        slug: page.slug,
        content: getDefaultPageContent(page.title),
      },
    })
  }

  revalidatePath('/')
  revalidatePath('/admin/menu')
  revalidatePath('/admin/pages')
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

  const existingPage = await prisma.page.findUnique({ where: { id } })
  const updatedPage = await prisma.page.update({
    where: { id },
    data: {
      title,
      content,
    }
  })

  if (existingPage) {
    revalidatePath(`/${existingPage.slug}`)
  }
  revalidatePath(`/${updatedPage.slug}`)
  revalidatePath('/')
  revalidatePath('/admin/pages')
}

export async function createPage(formData: FormData) {
  await requireAdmin()

  const title = (formData.get('title') as string)?.trim()
  const rawSlug = (formData.get('slug') as string) || ""
  const content = sanitizeRichText(formData.get('content') as string)

  if (!title) {
    throw new Error("Title is required")
  }

  const slug = normalizePageSlug(rawSlug)
  if (!slug) {
    throw new Error("Valid slug is required")
  }

  const existing = await prisma.page.findUnique({ where: { slug } })
  if (existing) {
    throw new Error("A page with this slug already exists")
  }

  const page = await prisma.page.create({
    data: {
      title,
      slug,
      content: content || getDefaultPageContent(title),
    },
  })

  revalidatePath(`/${page.slug}`)
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
