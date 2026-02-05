import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { WRITING_CATEGORIES } from '../lib/writing'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('password123', 10)

  // 1. Admin User
  await prisma.user.upsert({
    where: { email: 'admin@vivartana.com' },
    update: {},
    create: {
      email: 'admin@vivartana.com',
      name: 'Admin',
      password,
    },
  })

  // 2. Menu Items & Pages
  // We will create Pages for each menu item to ensure the site is not static HTML.
  const slugify = (input: string) =>
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  const createSection = async (
    title: string,
    order: number,
    children: Array<{ title: string; slug?: string }>,
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
      const childSlug = children[i].slug ?? slugify(childTitle)
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

      // Create Content Page for this route
      await prisma.page.upsert({
        where: { slug: `${basePath}/${childSlug}` },
        update: {},
        create: {
          title: childTitle,
          slug: `${basePath}/${childSlug}`,
          content: `<p>This is the default content for <strong>${childTitle}</strong>. You can edit this in the Admin Panel.</p>`,
        },
      })
    }
  }

  // Clear existing to avoid duplicates during dev iteration
  await prisma.menuItem.deleteMany({})
  // We keep Pages/Posts if they exist, or upsert them.

  // About the Founder (Home)
  await createSection(
    'About the Founder',
    0,
    [
      { title: 'Hero Positioning', slug: 'hero-positioning' },
      { title: 'Journey', slug: 'journey' },
      { title: 'Vivartana', slug: 'vivartana' },
      { title: 'Cadeus Consulting', slug: 'cadeus-consulting' },
      { title: 'Values', slug: 'values' },
    ],
    'about',
    '/'
  )

  // Engage with Us
  await createSection(
    'Engage with Us',
    1,
    [
      { title: 'For Individuals', slug: 'for-individuals' },
      { title: 'For Organisations', slug: 'for-organisations' },
      { title: 'Engagement Models', slug: 'engagement-models' },
      { title: 'Onboarding', slug: 'onboarding' },
    ],
    'engage'
  )

  // Knowledge Assets
  await createSection(
    'Knowledge Assets',
    2,
    [
      { title: 'Frameworks & IP', slug: 'frameworks-ip' },
      { title: 'Case Studies', slug: 'case-studies' },
      { title: 'Papers & Concept Notes', slug: 'papers-notes' },
      { title: 'Research Artifacts', slug: 'research-artifacts' },
    ],
    'knowledge'
  )

  // Ongoing Research
  await createSection(
    'Ongoing Research',
    3,
    [
      { title: 'Research Theme', slug: 'theme' },
      { title: 'Methodology', slug: 'methodology' },
      { title: 'Evolution of Thought', slug: 'evolution' },
      { title: 'Practice Implications', slug: 'implications' },
    ],
    'research'
  )

  // Resources
  await createSection(
    'Resources',
    4,
    [
      { title: 'enVisions', slug: 'envisions' },
      { title: 'Articles / Blogs', slug: 'articles' },
      { title: 'Downloads', slug: 'downloads' },
      { title: 'FAQs', slug: 'faqs' },
    ],
    'resources'
  )

  // Contact
  await prisma.menuItem.create({
    data: { title: 'Contact', order: 5, url: '/contact' }
  })

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
      value: 'Hero Statement: High impact. Minimal distraction.',
    },
  })
  
  await prisma.siteSetting.upsert({
    where: { key: 'about_bio' },
    update: {},
    create: {
      key: 'about_bio',
      value: '6-8 lines of bio placeholder. The founder blends engineering, psychology, and research to guide high-stakes transformation.',
    },
  })

  await prisma.siteSetting.upsert({
    where: { key: 'pillars_description' },
    update: {},
    create: {
      key: 'pillars_description',
      value: JSON.stringify([
        "Engage with Us",
        "Knowledge Assets",
        "Ongoing Research",
        "Resources"
      ]),
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
