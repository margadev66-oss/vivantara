import { prisma } from "@/lib/prisma"
import { DEFAULT_HOME_CONTENT, mergeHomeContent, type HomeContent } from "@/lib/home-content"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpenCheck, CheckCircle2, ChevronDown, ShieldCheck, Sparkles, Target } from "lucide-react"

function Hero({ content }: { content: typeof DEFAULT_HOME_CONTENT.hero }) {
    return (
        <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center bg-canvas px-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-warmth/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-thought leading-tight mb-8 tracking-tight max-w-5xl">
                    {content.title}
                </h1>

                {(content.body_1 || content.body_2) && (
                    <div className="max-w-4xl space-y-3 text-base md:text-lg text-thought/85 leading-relaxed mb-10">
                        {content.body_1 ? <p>{content.body_1}</p> : null}
                        {content.body_2 ? <p>{content.body_2}</p> : null}
                    </div>
                )}

                <Link
                    href="/contact"
                    className="cta-button h-9 gap-2 px-4 text-xs whitespace-nowrap sm:text-sm"
                >
                    <span>{content.button_label}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <Link href="#who-we-are" className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-thought/30">
                <ChevronDown size={32} />
            </Link>
        </section>
    )
}

function WhoWeAre({ content }: { content: typeof DEFAULT_HOME_CONTENT.who_we_are }) {
    return (
        <section id="who-we-are" className="py-28 bg-white border-t border-warmth/20 px-6">
            <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-14">
                <div className="lg:col-span-5">
                    <p className="text-sm uppercase tracking-widest text-action mb-6">{content.eyebrow}</p>
                    <h2 className="text-3xl md:text-4xl font-serif text-thought leading-tight mb-6">
                        {content.title}
                    </h2>
                </div>
                <div className="lg:col-span-7 space-y-6 text-lg text-thought/80 leading-relaxed">
                    <p>{content.body_1}</p>
                    <p>{content.body_2}</p>
                </div>
            </div>
        </section>
    )
}

function WhatWeDo({ content }: { content: typeof DEFAULT_HOME_CONTENT.what_we_do }) {
    return (
        <section id="what-we-do" className="bg-canvas px-6 py-28 border-t border-warmth/20">
            <div className="container mx-auto max-w-7xl">
                <p className="text-sm uppercase tracking-widest text-action mb-4">{content.eyebrow}</p>
                <h2 className="text-4xl md:text-5xl font-serif text-thought mb-8 max-w-4xl leading-tight">{content.title}</h2>
                <p className="text-lg text-thought/80 leading-relaxed max-w-4xl mb-12">{content.intro}</p>

                <h3 className="text-2xl font-serif text-thought mb-6">{content.focus_title}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.focus_areas.map((focusArea, index) => (
                        <li
                            key={`${focusArea}-${index}`}
                            className="flex items-start gap-3 border border-warmth/20 bg-white px-5 py-4"
                        >
                            <CheckCircle2 size={18} className="text-action mt-1 flex-shrink-0" />
                            <span className="text-thought/80 leading-relaxed">{focusArea}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

function WhyThisMatters({ content }: { content: typeof DEFAULT_HOME_CONTENT.why_this_matters }) {
    return (
        <section id="why-this-matters" className="py-28 bg-thought text-canvas px-6">
            <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-14">
                <div className="lg:col-span-5">
                    <p className="text-sm uppercase tracking-widest text-action mb-6">{content.eyebrow}</p>
                    <h2 className="text-4xl md:text-5xl font-serif leading-tight">{content.title}</h2>
                </div>

                <div className="lg:col-span-7">
                    <p className="text-lg text-white font-semibold leading-relaxed mb-6">{content.intro}</p>
                    <ul className="space-y-3 mb-8">
                        {content.pressure_signals.map((signal, index) => (
                            <li key={`${signal}-${index}`} className="text-lg text-white/85 leading-relaxed">
                                {signal}
                            </li>
                        ))}
                    </ul>
                    <p className="text-white text-lg font-medium leading-relaxed">{content.closing}</p>
                </div>
            </div>
        </section>
    )
}

function HowWeWork({ content }: { content: typeof DEFAULT_HOME_CONTENT.how_we_work }) {
    return (
        <section id="how-we-work" className="py-28 bg-white px-6 border-t border-warmth/20">
            <div className="container mx-auto max-w-7xl">
                <p className="text-sm uppercase tracking-widest text-action mb-4">{content.eyebrow}</p>
                <h2 className="text-4xl md:text-5xl font-serif text-thought mb-8 max-w-4xl leading-tight">{content.title}</h2>
                <p className="text-lg text-thought/80 leading-relaxed max-w-4xl mb-12">{content.intro}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                    {content.steps.map((step, index) => (
                        <article key={`${step.title}-${index}`} className="border border-warmth/20 bg-canvas p-8">
                            <div className="text-xs uppercase tracking-widest text-action mb-3">Step {index + 1}</div>
                            <h3 className="text-2xl font-serif text-thought mb-4">{step.title}</h3>
                            <p className="text-thought/75 leading-relaxed">{step.description}</p>
                        </article>
                    ))}
                </div>

                <div className="border border-thought/10 bg-thought text-white p-8 md:p-10">
                    <h3 className="text-2xl md:text-3xl font-serif mb-6">{content.cycle_title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        {content.cycle_stages.map((stage) => (
                            <span
                                key={stage}
                                className="px-4 py-2 rounded-full border border-white/20 text-sm uppercase tracking-wide"
                            >
                                {stage}
                            </span>
                        ))}
                    </div>
                    <p className="text-white/90 leading-relaxed">{content.cycle_body}</p>
                </div>
            </div>
        </section>
    )
}

function AboutFounder({ content }: { content: typeof DEFAULT_HOME_CONTENT.about_founder }) {
    return (
        <section id="about-the-founder" className="py-28 bg-canvas border-t border-warmth/20 px-6">
            <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5">
                    <p className="text-sm uppercase tracking-widest text-action mb-6">{content.eyebrow}</p>
                    <h2 className="text-4xl md:text-5xl font-serif text-thought leading-tight mb-6">
                        {content.title}
                    </h2>
                    <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full border border-warmth/20 bg-white sm:h-64 sm:w-64 md:h-72 md:w-72 lg:mx-0">
                        <Image
                            src="/potrait.png"
                            alt="Founder portrait"
                            fill
                            sizes="(min-width: 1024px) 18rem, 16rem"
                            className="object-cover object-[50%_18%] scale-125"
                        />
                    </div>
                </div>
                <div className="lg:col-span-7 h-full flex flex-col justify-end space-y-6 text-lg text-thought/80 leading-relaxed">
                    <p>{content.body_1}</p>
                    <p>{content.body_2}</p>
                    <Link href="/contact" className="cta-button h-9 gap-2 px-4 text-xs whitespace-nowrap sm:text-sm w-fit">
                        Start a Conversation <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

function TrustMarkers({ content }: { content: typeof DEFAULT_HOME_CONTENT.trust_markers }) {
    const markerIcons = [ShieldCheck, Target, Sparkles, BookOpenCheck]

    return (
        <section id="trust-markers" className="py-28 bg-white border-t border-warmth/20 px-6">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                    <div>
                        <p className="text-sm uppercase tracking-widest text-action mb-4">{content.eyebrow}</p>
                        <h2 className="text-4xl md:text-5xl font-serif text-thought">{content.title}</h2>
                    </div>
                    <Link href="/knowledge-assets" className="text-action font-medium flex items-center gap-2">
                        {content.link_label} <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {content.items.map((marker, index) => {
                        const Icon = markerIcons[index] || ShieldCheck
                        return (
                            <div key={`${marker.title}-${index}`} className="border border-warmth/20 bg-canvas p-8">
                                <Icon size={28} className="text-action mb-6" />
                                <h3 className="text-xl font-serif text-thought mb-3">{marker.title}</h3>
                                <p className="text-thought/70 leading-relaxed">{marker.description}</p>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-12">
                    <Link href="/resources" className="text-action font-medium inline-flex items-center gap-2">
                        More Resources <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

function CTA({ content }: { content: typeof DEFAULT_HOME_CONTENT.cta }) {
    return (
        <section id="call-to-action" className="py-32 bg-thought text-center px-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-12 tracking-tight max-w-5xl mx-auto">
                    {content.title}
                </h2>
                <Link
                    href="/contact"
                    className="cta-button h-10 px-5 text-sm whitespace-nowrap sm:text-base"
                >
                    {content.button_label}
                </Link>
            </div>
        </section>
    )
}

export default async function Home() {
    const homeContentSetting = await prisma.siteSetting.findUnique({ where: { key: "home_content" } })

    let homeContent = DEFAULT_HOME_CONTENT

    if (homeContentSetting?.value) {
        try {
            const parsedHomeContent = JSON.parse(homeContentSetting.value) as Partial<HomeContent>
            const isLegacyContent =
                typeof parsedHomeContent !== "object" ||
                parsedHomeContent === null ||
                !parsedHomeContent.hero ||
                !parsedHomeContent.why_this_matters ||
                !parsedHomeContent.how_we_work

            homeContent = isLegacyContent ? DEFAULT_HOME_CONTENT : mergeHomeContent(parsedHomeContent)
        } catch {
            homeContent = DEFAULT_HOME_CONTENT
        }
    }

    return (
        <main className="min-h-screen">
            <Hero content={homeContent.hero} />
            <WhoWeAre content={homeContent.who_we_are} />
            <WhatWeDo content={homeContent.what_we_do} />
            <WhyThisMatters content={homeContent.why_this_matters} />
            <HowWeWork content={homeContent.how_we_work} />
            <AboutFounder content={homeContent.about_founder} />
            <TrustMarkers content={homeContent.trust_markers} />
            <CTA content={homeContent.cta} />
        </main>
    )
}
