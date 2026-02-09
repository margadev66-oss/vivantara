import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { WRITING_CATEGORIES } from '../lib/writing'
import {
  SITE_NAVIGATION,
  getDefaultEditablePages,
  getDefaultPageContent,
} from '../lib/site-structure'
import { DEFAULT_HOME_CONTENT } from '../lib/home-content'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('rajeshwari@123123', 10)

  // 1. Admin User
  await prisma.user.upsert({
    where: { email: 'admin@vivartana.com' },
    update: {
      password,
      name: 'Admin',
    },
    create: {
      email: 'admin@vivartana.com',
      name: 'Admin',
      password,
    },
  })

  // 2. Menu Items & Pages
  // We will create Pages for each menu item to ensure the site is not static HTML.
  const createSection = async (
    title: string,
    order: number,
    children: Array<{ title: string; slug: string }>,
    basePath: string,
    parentUrl?: string
  ) => {
    // Create Menu Parent
    const parent = await prisma.menuItem.create({
      data: {
        title,
        order,
        url: parentUrl ?? `/${basePath}`,
      },
    })

    // Create Children
    for (let i = 0; i < children.length; i++) {
      const childTitle = children[i].title
      const childSlug = children[i].slug
      const fullPath = `/${basePath}/${childSlug}`

      // Create Menu Item
      await prisma.menuItem.create({
        data: {
          title: childTitle,
          order: i,
          parentId: parent.id,
          url: fullPath,
        },
      })
    }
  }

  // Clear existing to avoid duplicates during dev iteration
  await prisma.menuItem.deleteMany({})
  // We keep Pages/Posts if they exist, or upsert them.

  for (let i = 0; i < SITE_NAVIGATION.length; i++) {
    const item = SITE_NAVIGATION[i]
    if (item.children && item.basePath) {
      await createSection(item.title, i, item.children, item.basePath, item.url)
      continue
    }

    await prisma.menuItem.create({
      data: { title: item.title, order: i, url: item.url }
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

  // 3. Seed Posts
  const postSlug = 'example-article'
  await prisma.post.upsert({
    where: { slug: postSlug },
    update: {},
    create: {
      title: 'The Impact of Adaptive Excellence',
      slug: postSlug,
      category: WRITING_CATEGORIES[3] ?? 'Research Reflections',
      content: '<p>Deep dive into the AEF framework...</p>',
      published: true,
    }
  })

  // 4. Site Settings
  await prisma.siteSetting.upsert({
    where: { key: 'hero_statement' },
    update: {},
    create: {
      key: 'hero_statement',
      value: 'How your organisation responds when things go wrong tells the real story.',
    },
  })
  
  await prisma.siteSetting.upsert({
    where: { key: 'about_bio' },
    update: {},
    create: {
      key: 'about_bio',
      value: 'Aumlan Guha is the Founder of Vivartana and an Organisational Stress Response Specialist and Transformation Partner.',
    },
  })

  await prisma.siteSetting.upsert({
    where: { key: 'pillars_description' },
    update: {},
    create: {
      key: 'pillars_description',
      value: JSON.stringify([
        "How teams perceive and interpret emerging challenges",
        "How people coordinate under ambiguity",
        "How leadership behaviour shapes organisational response",
        "How roles align with cognitive strengths",
        "How Cognitive Diversity and Neurodiversity become performance assets",
        "How the organisation holds together under stress"
      ]),
    },
  })

  await prisma.siteSetting.upsert({
    where: { key: 'home_content' },
    update: {},
    create: {
      key: 'home_content',
      value: JSON.stringify(DEFAULT_HOME_CONTENT),
    },
  })
  
  console.log('Seed completed')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
