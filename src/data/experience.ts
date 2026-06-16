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
      "Hardened applications with Snyk and Checkov scans, managed secrets via Vault, refactored the codebase, and wrote unit tests.",
      "Configured NGINX as a reverse-proxy / load-balancer for microservices.",
    ],
    tech: ["React", "Docker", "AWS EKS", "Jenkins", "NGINX", "CI/CD"],
  },
];
