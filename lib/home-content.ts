export type HomeContent = {
  hero: {
    title: string
    body_1: string
    body_2: string
    button_label: string
  }
  who_we_are: {
    eyebrow: string
    title: string
    body_1: string
    body_2: string
  }
  what_we_do: {
    eyebrow: string
    title: string
    intro: string
    focus_title: string
    focus_areas: string[]
  }
  why_this_matters: {
    eyebrow: string
    title: string
    intro: string
    pressure_signals: string[]
    closing: string
  }
  how_we_work: {
    eyebrow: string
    title: string
    intro: string
    steps: Array<{
      title: string
      description: string
    }>
    cycle_title: string
    cycle_stages: string[]
    cycle_body: string
  }
  about_founder: {
    eyebrow: string
    title: string
    body_1: string
    body_2: string
  }
  trust_markers: {
    eyebrow: string
    title: string
    link_label: string
    items: Array<{
      title: string
      description: string
    }>
    insights_title: string
    insights_link_label: string
  }
  cta: {
    title: string
    button_label: string
  }
}

export const DEFAULT_HOME_CONTENT: HomeContent = {
  hero: {
    title: "How your organisation responds when things go wrong tells the real story.",
    body_1:
      "Organisations struggle not just because of poor strategy or weak processes.",
    body_2:
      "They struggle because of how people sense, interpret, coordinate, and hold together under pressure. Vivartana helps organisations strengthen this Organisational Stress Response, including how Cognitive Diversity and Neurodiversity are recognised and leveraged when it matters most.",
    button_label: "Discover how your organisation truly responds under pressure",
  },
  who_we_are: {
    eyebrow: "Who We Are",
    title: "A transformation partner for organisations navigating uncertainty.",
    body_1:
      "Vivartana is a transformation partner for organisations navigating uncertainty, disruption, and constant change.",
    body_2:
      "Vivartana works at the intersection of leadership, quality management, and organisational behaviour to help organisations build the internal coherence required to perform when tested.",
  },
  what_we_do: {
    eyebrow: "What We Do",
    title: "Strengthening the dimensions that determine response under pressure.",
    intro:
      "Vivartana works on the underlying organisational dimensions that determine how people sense, interpret, coordinate, and hold together under pressure.",
    focus_title: "This includes working on",
    focus_areas: [
      "How teams perceive and interpret emerging challenges",
      "How people coordinate under ambiguity",
      "How leadership behaviour shapes organisational response",
      "How roles align with cognitive strengths",
      "How Cognitive Diversity and Neurodiversity become performance assets",
      "How the organisation holds together under stress",
    ],
  },
  why_this_matters: {
    eyebrow: "Why This Matters",
    title: "Pressure exposes where response systems break down.",
    intro: "When organisations are under pressure:",
    pressure_signals: [
      "Capable people appear to underperform",
      "Teams miscommunicate",
      "Decision quality drops",
      "Leadership intent does not translate into behaviour",
      "Valuable cognitive strengths go unnoticed",
    ],
    closing: "These are not culture issues. They are Organisational Stress Response issues.",
  },
  how_we_work: {
    eyebrow: "How We Work",
    title: "A structured, iterative workflow for stronger organisational response.",
    intro:
      "Vivartana follows a structured, iterative workflow to progressively strengthen organisational stress response.",
    steps: [
      {
        title: "ORI Scan",
        description:
          "A proprietary diagnostic exercise to understand how the organisation actually behaves under pressure through structured conversations and observations.",
      },
      {
        title: "Roadmap",
        description:
          "Insights from the ORI Scan are translated into practical focus areas involving leadership behaviour, role design, Cognitive Diversity and Neurodiversity, and psychosocial alignment.",
      },
      {
        title: "Transformation Engagement",
        description:
          "Vivartana partners with organisations over time to strengthen how people sense, interpret, coordinate, and hold together when tested.",
      },
    ],
    cycle_title: "The Iterative Cycle",
    cycle_stages: ["Scan", "Interpret", "Strengthen", "Re-Scan"],
    cycle_body:
      "Over successive cycles, organisations progressively strengthen their Adaptive Business Operating System (ABOS), their current operating maturity. As the ABOS matures and the Antifragility Achievement Index (AAI) improves, the organisation moves closer to antifragility: the ability to grow stronger through stress and disruption.",
  },
  about_founder: {
    eyebrow: "About the Founder",
    title: "Aumlan Guha",
    body_1:
      "Aumlan Guha is the Founder of Vivartana and an Organisational Stress Response Specialist and Transformation Partner.",
    body_2:
      "With over two decades of experience in software delivery excellence and advanced studies in quality management and human resource management, he brings deep operational and organisational insight to transformation work. He is currently pursuing doctoral research into organisational intelligence and antifragile excellence in AI-enabled service organisations.",
  },
  trust_markers: {
    eyebrow: "Trust Markers",
    title: "Depth of practice and research grounding.",
    link_label: "Explore knowledge assets",
    items: [
      {
        title: "22 years in software delivery excellence",
        description:
          "Experience spanning high-stakes delivery, leadership responsibility, and complex execution environments.",
      },
      {
        title: "Advanced studies in Quality Management and Human Resource Management",
        description:
          "Formal academic grounding that bridges systems thinking and organisational behaviour.",
      },
      {
        title: "Doctoral research in organisational intelligence and antifragility",
        description:
          "Current research focus on how organisations become stronger through uncertainty and disruption.",
      },
      {
        title: "Experience across leadership, teams, and complex environments",
        description:
          "Hands-on transformation work across varied contexts where performance under pressure matters.",
      },
    ],
    insights_title: "Latest Insights",
    insights_link_label: "View all articles",
  },
  cta: {
    title: "Curious about how your organisation truly responds when tested?",
    button_label: "Start a conversation",
  },
}

export function mergeHomeContent(overrides?: Partial<HomeContent>): HomeContent {
  const safe = overrides ?? {}

  return {
    ...DEFAULT_HOME_CONTENT,
    ...safe,
    hero: {
      ...DEFAULT_HOME_CONTENT.hero,
      ...safe.hero,
    },
    who_we_are: {
      ...DEFAULT_HOME_CONTENT.who_we_are,
      ...safe.who_we_are,
    },
    what_we_do: {
      ...DEFAULT_HOME_CONTENT.what_we_do,
      ...safe.what_we_do,
      focus_areas:
        Array.isArray(safe.what_we_do?.focus_areas) && safe.what_we_do.focus_areas.length
          ? safe.what_we_do.focus_areas
          : DEFAULT_HOME_CONTENT.what_we_do.focus_areas,
    },
    why_this_matters: {
      ...DEFAULT_HOME_CONTENT.why_this_matters,
      ...safe.why_this_matters,
      pressure_signals:
        Array.isArray(safe.why_this_matters?.pressure_signals) &&
        safe.why_this_matters.pressure_signals.length
          ? safe.why_this_matters.pressure_signals
          : DEFAULT_HOME_CONTENT.why_this_matters.pressure_signals,
    },
    how_we_work: {
      ...DEFAULT_HOME_CONTENT.how_we_work,
      ...safe.how_we_work,
      steps:
        Array.isArray(safe.how_we_work?.steps) && safe.how_we_work.steps.length
          ? safe.how_we_work.steps
          : DEFAULT_HOME_CONTENT.how_we_work.steps,
      cycle_stages:
        Array.isArray(safe.how_we_work?.cycle_stages) && safe.how_we_work.cycle_stages.length
          ? safe.how_we_work.cycle_stages
          : DEFAULT_HOME_CONTENT.how_we_work.cycle_stages,
    },
    about_founder: {
      ...DEFAULT_HOME_CONTENT.about_founder,
      ...safe.about_founder,
    },
    trust_markers: {
      ...DEFAULT_HOME_CONTENT.trust_markers,
      ...safe.trust_markers,
      items:
        Array.isArray(safe.trust_markers?.items) && safe.trust_markers.items.length
          ? safe.trust_markers.items
          : DEFAULT_HOME_CONTENT.trust_markers.items,
    },
    cta: {
      ...DEFAULT_HOME_CONTENT.cta,
      ...safe.cta,
    },
  }
}
