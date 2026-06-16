/*
  Site-wide identity + contact data. Single edit point for name, role, socials.
*/
export const site = {
  name: "Laurent Lefebvre",
  firstName: "Laurent",
  role: "Software & Mobile (iOS) Engineer",
  shortRole: "iOS & Full-Stack Engineer",
  tagline:
    "I build polished, cross-platform mobile products end to end — from a shared Kotlin Multiplatform core to shipped App Store and Google Play apps.",
  blurb:
    "iOS-focused software engineer with full-stack range. I've shipped native apps in production at OpenLane, built enterprise systems at National Bank of Canada, and now lead Sensium — a 10-platform wine-study app powered by a single shared core.",
  email: "laurent.d.lefebvre@gmail.com",
  location: "Montréal, Québec, Canada",
  availability: "Open to iOS & full-stack engineering roles",
  url: "https://www.laurentlefebvre.me",
  socials: {
    github: { label: "GitHub", url: "https://github.com/ldlefebvre", icon: "github" },
    linkedin: {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/laurentlefebvre/",
      icon: "linkedin",
    },
    instagram: {
      label: "Instagram",
      url: "https://www.instagram.com/laurent.d.lefebvre/",
      icon: "instagram",
    },
  },
} as const;

export type Site = typeof site;
