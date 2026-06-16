/*
  Experience timeline — impact-first, engineering-forward.
  Dates and role details reconciled against Laurent's CV (June 2026).
*/
export interface Role {
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tech: string[];
  current?: boolean;
}

export const experience: Role[] = [
  {
    company: "Sensium",
    title: "Founder & Lead Engineer",
    period: "2026 — Present",
    location: "Montréal / Remote",
    current: true,
    summary:
      "Founder and sole engineer behind Sensium: Blind-Tasting Coach — a premium, offline-first wine-study app for sommelier-track students and serious enthusiasts, owned end to end from product and design through engineering and launch.",
    highlights: [
      "Architected one Kotlin Multiplatform core (data model, search, blind-scoring engine) that drives a true 10-platform suite.",
      "Built native shells in SwiftUI (iOS, iPadOS, macOS, watchOS, visionOS) and Jetpack Compose (Android, Wear OS) plus a static web app.",
      "Shipped an offline-first atlas of 1,534 grape varieties with unified subscriptions via RevenueCat and a Stripe web lane.",
      "Stood up multi-platform CI and a Python data-validation/QA pipeline on a Firebase backend.",
      "Wear every hat beyond code — product, UX and visual design, the variety content model, pricing, and App Store / Play Store launches.",
    ],
    tech: ["Kotlin Multiplatform", "SwiftUI", "Jetpack Compose", "Firebase", "RevenueCat", "CI/CD"],
  },
  {
    company: "OpenLane",
    title: "Mobile iOS Developer",
    period: "2025 — 2026",
    location: "Montréal / Remote",
    summary:
      "Led end-to-end iOS feature development on OpenLane's production app in the automotive wholesale-marketplace space.",
    highlights: [
      "Led end-to-end development of key iOS features in SwiftUI, shaping architecture and aligning design, backend, Android, and web teams for a consistent cross-platform experience.",
      "Owned major parts of the TradeRev decommissioning — redesigning core workflows, integrating new APIs, and modernizing legacy UIKit and storyboard code into scalable SwiftUI components.",
      "Shipped well-tested features through rigorous GitHub peer review, QA cycles, and CI/CD with mandated coverage, raising reliability with XCTest (including snapshots), feature flags, and Segment analytics.",
    ],
    tech: ["Swift", "SwiftUI", "UIKit", "XCTest", "CI/CD", "Segment"],
  },
  {
    company: "National Bank of Canada",
    title: "Full-Stack Engineer Intern",
    period: "2025",
    location: "Montréal",
    summary:
      "Full-stack and DevOps internship building, hardening, and shipping containerized microservices on AWS at one of Canada's largest banks.",
    highlights: [
      "Containerized and deployed a React front-end microservice on AWS EKS using Docker, and maintained Jenkins-driven CI/CD pipelines.",
      "Contributed to an enterprise-wide cloud migration across multiple banking applications, modernizing deployment from legacy infrastructure to AWS Kubernetes with zero service disruption.",
      "Hardened applications with Snyk and Checkov scans, managed secrets via Vault, refactored the codebase, and wrote unit tests with Jest and React Testing Library.",
      "Configured NGINX as a reverse-proxy / load-balancer for microservices.",
    ],
    tech: ["React", "Docker", "AWS EKS", "Kubernetes", "Jenkins", "NGINX", "CI/CD"],
  },
  {
    company: "Nouri Health",
    title: "CTO & Mobile Engineer",
    period: "2024 — 2025",
    location: "Montréal / Remote",
    summary:
      "Technical lead for Nouri, a personalized nutrition coach that turns Whoop and Oura wearable data into daily, dietitian-backed food recommendations across iOS and Android.",
    highlights: [
      "Led the mobile technical direction and built the cross-platform Flutter app from a single codebase, shipping to both the App Store and Google Play.",
      "Integrated Whoop and Oura wearable data into a daily-engagement loop delivering 6–8 personalized, dietitian-backed recommendations.",
      "Shipped end-to-end surfaces — onboarding and wearable setup, the recommendation feed, recipes, smart grocery lists with Instacart, and progress tracking.",
    ],
    tech: ["Flutter", "Dart", "TypeScript", "REST APIs"],
  },
  {
    company: "Exad",
    title: "Founder & iOS Engineer",
    period: "2021 — 2025",
    location: "Montréal",
    summary:
      "Founded Exad and shipped a native iOS marketplace for adrenaline-fueled adventures and extreme sports to the App Store — owned end to end from product and design through engineering.",
    highlights: [
      "Founded and shipped a two-sided iOS marketplace to the App Store, owning product, design, and engineering end to end.",
      "Built the native Swift/SwiftUI client — discovery and search, booking flow, real-time chat, maps, a custom camera, deep links, and push — on a Firebase backend.",
      "Integrated Stripe Connect payments through a Node.js layer with automated transactional emails for a live two-sided marketplace.",
      "Owned App Store review and release management, plus branding with custom SF Symbols and Figma/Photoshop.",
    ],
    tech: ["Swift", "SwiftUI", "Firebase", "Node.js", "Stripe"],
  },
];
