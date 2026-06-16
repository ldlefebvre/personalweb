/*
  Site-wide identity + contact data. Single edit point for name, role, socials.
*/
export const site = {
  name: "Laurent Lefebvre",
  firstName: "Laurent",
  role: "Software & Mobile Engineer",
  shortRole: "Mobile & Full-Stack Engineer",
  tagline:
    "iOS specialist with full-stack range — I ship polished, cross-platform mobile apps end to end, from a shared core to the App Store, Google Play, and the web.",
  blurb:
    "iOS specialist and full-stack engineer. I've shipped native iOS in production at OpenLane, cross-platform apps with Kotlin Multiplatform and Flutter, and full-stack systems on AWS at National Bank of Canada — and I now lead Sensium, a 10-platform wine-study app on one shared core.",
  email: "laurent.d.lefebvre@gmail.com",
  location: "Montréal, Québec, Canada",
  availability: "Open to mobile, web & full-stack roles",
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
