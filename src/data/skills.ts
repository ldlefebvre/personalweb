/*
  Skills grouped by use case (NOT a flat icon wall). Each group maps to how the
  work is actually done, and everything here is backed by a shipped project.
*/
export interface SkillGroup {
  title: string;
  blurb: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Mobile",
    blurb: "Native apps and shared cross-platform cores.",
    skills: ["Swift", "SwiftUI", "Kotlin Multiplatform", "Jetpack Compose", "UIKit", "Xcode"],
  },
  {
    title: "Web & Backend",
    blurb: "Full-stack web apps and services.",
    skills: ["Ruby on Rails", "Node.js", "TypeScript", "JavaScript", "Python", "HTML & CSS"],
  },
  {
    title: "Data & Cloud",
    blurb: "Storage, sync, and serverless.",
    skills: ["Firebase", "PostgreSQL", "Google Cloud", "REST APIs", "Astro"],
  },
  {
    title: "Tooling & Practice",
    blurb: "How it ships and stays maintainable.",
    skills: ["Git", "CI/CD", "Figma", "RevenueCat", "Stripe", "Postman"],
  },
];
