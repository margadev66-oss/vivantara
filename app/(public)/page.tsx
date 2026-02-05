import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowRight, BookOpen, Layers, Users, Lightbulb, ChevronDown } from 'lucide-react'

// Enhanced Hero Section
function Hero({ statement, aboutBio }: { statement: string, aboutBio: string }) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center bg-canvas px-6 overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-warmth/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-thought leading-tight mb-12 tracking-tight">
          {statement}
        </h1>
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <Link
            href="/contact"
            className="group flex items-center gap-3 bg-thought text-white px-8 py-4 text-lg font-medium hover:bg-thought/90 transition-all"
          >
            <span>Start a Conversation</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="max-w-md text-thought/70 leading-relaxed border-l-2 border-action pl-6">
            <p>{aboutBio || "Transforming individuals, teams, and organisations through rigorous research and behavioural science."}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-thought/30">
        <ChevronDown size={32} />
      </div>
    </section>
  )
}

// Enhanced Pillars Grid
function Pillars({ description }: { description: string[] }) {
  const pillarIcons = [Users, BookOpen, Layers, Lightbulb] // Map roughly to the 4 default pillars
  const pillarLinks = [
    '/engage',
    '/knowledge',
    '/research',
    '/resources'
  ]

  return (
    <section className="bg-white border-t border-warmth/20 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {description.map((pillar, idx) => {
          const Icon = pillarIcons[idx] || Layers
          return (
            <Link
              href={pillarLinks[idx] || '#'}
              key={idx}
              className="group border-r border-b border-warmth/20 p-12 min-h-[400px] flex flex-col justify-between hover:bg-thought hover:text-white transition-all duration-500 ease-out"
            >
              <div>
                <Icon size={40} strokeWidth={1} className="text-action mb-8 group-hover:text-white/80 transition-colors" />
                <h3 className="text-2xl font-serif leading-snug group-hover:translate-x-2 transition-transform duration-300">
                  {pillar}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                <span>Explore</span>
                <ArrowRight size={16} />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function Context() {
  return (
    <section className="py-32 bg-thought text-canvas px-6 relative overflow-hidden">
      {/* Texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        <div className="lg:col-span-5">
          <h2 className="text-sm uppercase tracking-widest text-action mb-6">The Context</h2>
          <h3 className="text-5xl font-serif mb-8 leading-tight">The Problem Statement (CADEUS (TM))</h3>
        </div>
        <div className="lg:col-span-7 space-y-8 text-lg text-warmth/80 leading-relaxed">
          <p>
            In a world obsessed with speed, we often sacrifice depth. Organisations are overwhelmed by noise, losing sight of the fundamental human behaviours that drive true excellence.
          </p>
          <p>
            CADEUS (TM) represents the chaos of unchecked variables. Without a structured approach to Behavioural Quality Management, potential dissipates into entropy.
          </p>
          <div className="pt-8 border-t border-white/10">
            <h4 className="text-white text-xl font-serif mb-2">Why this matters today</h4>
            <p className="text-sm">
              The intersection of Fortitude and MindShift is where sustainable growth happens.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Methodology() {
  return (
    <section className="py-32 bg-canvas px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-sm uppercase tracking-widest text-warmth mb-4">The Methodology</h2>
          <h3 className="text-4xl md:text-6xl font-serif text-thought">
            Fortitude <-> MindShift
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-warmth/20">
          <div className="p-10 border-b md:border-b-0 md:border-r border-warmth/20 bg-white hover:bg-warmth/5 transition-colors">
            <div className="text-6xl font-serif text-warmth/20 mb-6">01</div>
            <h4 className="text-2xl font-serif text-thought mb-4">Behaviour</h4>
            <p className="text-thought/70 leading-relaxed">
              Understanding the human element as the primary variable in any equation of success.
            </p>
          </div>
          <div className="p-10 border-b md:border-b-0 md:border-r border-warmth/20 bg-white hover:bg-warmth/5 transition-colors">
            <div className="text-6xl font-serif text-warmth/20 mb-6">02</div>
            <h4 className="text-2xl font-serif text-thought mb-4">Systems</h4>
            <p className="text-thought/70 leading-relaxed">
              Designing resilient structures that support, rather than stifle, human potential.
            </p>
          </div>
          <div className="p-10 bg-white hover:bg-warmth/5 transition-colors">
            <div className="text-6xl font-serif text-warmth/20 mb-6">03</div>
            <h4 className="text-2xl font-serif text-thought mb-4">Excellence</h4>
            <p className="text-thought/70 leading-relaxed">
              The outcome of aligned behaviour and systems. Adaptive, consistent, and measurable.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Latest Insights Component (New)
async function LatestInsights() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 3
  })

  if (posts.length === 0) return null

  return (
    <section className="py-24 bg-gray-50 px-6 border-t border-warmth/10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-serif text-thought">Latest Insights</h2>
          <Link href="/resources/articles" className="text-action hover:text-thought transition-colors font-medium flex items-center gap-2">
            View all articles <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/writing/${post.slug}`} className="group block bg-white border border-warmth/10 p-8 hover:shadow-xl hover:shadow-warmth/5 transition-all">
              <div className="text-xs uppercase tracking-widest text-warmth mb-4">{post.category}</div>
              <h3 className="text-xl font-serif text-thought group-hover:text-action transition-colors mb-4 line-clamp-2">
                {post.title}
              </h3>
              <div className="text-thought/60 text-sm line-clamp-3 mb-6" dangerouslySetInnerHTML={{ __html: (post.content || '').replace(/<[^>]*>?/gm, '') }} />
              <span className="text-sm font-medium text-thought/80 group-hover:translate-x-2 transition-transform inline-block">Read Essay &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-32 bg-thought text-center px-6 relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />

      <div className="relative z-10">
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-12 tracking-tight">
          Find what fits you
        </h2>
        <Link
          href="/contact"
          className="inline-block bg-action text-white px-10 py-5 text-xl font-medium hover:bg-white hover:text-thought transition-all transform hover:scale-105"
        >
          Start a conversation
        </Link>
      </div>
    </section>
  )
}

export default async function Home() {
  // Fetch dynamic content
  const heroSetting = await prisma.siteSetting.findUnique({ where: { key: 'hero_statement' } })
  const pillarsSetting = await prisma.siteSetting.findUnique({ where: { key: 'pillars_description' } })
  const bioSetting = await prisma.siteSetting.findUnique({ where: { key: 'about_bio' } })

  const heroText = heroSetting?.value || "Hero Statement Placeholder"
  const aboutBio = bioSetting?.value || ""
  const pillars = pillarsSetting ? JSON.parse(pillarsSetting.value) : []

  return (
    <main className="min-h-screen">
      <Hero statement={heroText} aboutBio={aboutBio} />
      <Pillars description={pillars} />
      <Context />
      <Methodology />
      <LatestInsights />
      <CTA />
    </main>
  )
}
