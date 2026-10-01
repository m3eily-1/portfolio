// Ported from "Ahmed Mealy portfolio.pdf" (early 2024) and refreshed to 2026.
// Running totals were updated (UX since 2018 → 8+ years); everything else is from the PDF.

export const person = {
  name: "Ahmed Mealy",
  first: "Ahmed",
  last: "Mealy",
  role: "Product Design Lead",
  company: "webook",
  city: "Riyadh",
  email: "ahmed.k.mealy@gmail.com",
  phone: "+966 50 841 2493",
  // Hero portrait (a transparent cut-out, bottom-aligned). Empty = no portrait.
  portrait: "/img/portrait-hero.webp?v=2",
  quote: "Design is a silent storyteller, weaving narratives through the seamless integration of form and function.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/m3eily" },
    { label: "Dribbble", href: "https://dribbble.com/m3eily" },
    { label: "Behance", href: "https://www.behance.net/m3eily" },
  ],
};

export const stats = [
  { value: 16, suffix: "", label: "years since the first pixel" },
  { value: 8, suffix: "+", label: "years in UX & product" },
  { value: 40, suffix: "+", label: "projects shipped" },
];

export type Release = {
  version: string;
  years: string;
  company: string;
  role: string;
  place: string;
  logo: string;
  notes: { tag: "Added" | "Improved" | "Shipped"; text: string }[];
  current?: boolean;
};

// Career as release notes: a product designer's changelog.
export const releases: Release[] = [
  {
    version: "v1.0",
    years: "2020",
    company: "360 Cloud Solutions",
    logo: "/img/logos/360.webp",
    role: "UX/UI Designer",
    place: "Cairo · Remote",
    notes: [
      { tag: "Added", text: "First full-time UX/UI role, two years after switching from graphic design." },
    ],
  },
  {
    version: "v1.1",
    years: "2020",
    company: "Apps Square",
    logo: "/img/logos/apps-square.webp",
    role: "UX/UI Designer · Part-time",
    place: "Tanta · Remote",
    notes: [{ tag: "Added", text: "Part-time product work alongside the day job." }],
  },
  {
    version: "v2.0",
    years: "2021",
    company: "iCity Services",
    logo: "/img/logos/icity.webp",
    role: "Senior UX/UI Designer",
    place: "Cairo · Remote",
    notes: [{ tag: "Improved", text: "Stepped up to a senior title." }],
  },
  {
    version: "v3.0",
    years: "2021 — 2023",
    company: "Tremoloo",
    logo: "/img/logos/tremoloo.webp",
    role: "Senior UX/UI Designer",
    place: "Giza · On-site",
    notes: [
      { tag: "Improved", text: "Two years on-site, on a design team building products for local and global clients." },
      { tag: "Added", text: "Mentor for two batches of Tremoloo's UX Camp." },
      { tag: "Added", text: "Represented Tremoloo at Techne Summit Cairo." },
    ],
  },
  {
    version: "v4.0",
    years: "2023 — 2024",
    company: "stc",
    logo: "/img/logos/stc.webp",
    role: "Senior Product Designer",
    place: "Riyadh · On-site",
    notes: [
      { tag: "Shipped", text: "A design system that cut design inconsistencies by 30% across platforms." },
      { tag: "Shipped", text: "A secure voting app for stc's Demand Committee." },
    ],
  },
  {
    version: "v5.0",
    years: "2024 — Now",
    company: "webook",
    logo: "/img/logos/webook.webp",
    role: "Product Design Lead",
    place: "Riyadh · On-site",
    notes: [
      { tag: "Shipped", text: "Social login, subscriptions, cashless payments, vouchers and gift cards." },
      { tag: "Shipped", text: "An affiliate program, the cruise booking journey and accessibility tickets." },
    ],
    current: true,
  },
];

export const phases = [
  { key: "Discover", line: "Research the right problem: interviews, audits, competitors, data." },
  { key: "Define", line: "Frame it sharply: problem statements, flows and success metrics." },
  { key: "Develop", line: "Explore wide: wireframes, prototypes, design directions." },
  { key: "Deliver", line: "Test with real users, refine, hand off, support the build." },
];

export const methods = [
  "Agile Design",
  "Lean UX",
  "Design Thinking",
  "Scrum",
  "User-Centered Design",
  "Sprint Design",
  "Rapid Prototyping",
  "Waterfall",
];

export const skills = {
  ux: ["User Research", "Prototyping", "Usability Testing", "Accessibility", "Competitive Analysis", "Problem Solving", "Information Architecture", "Wireframing", "UX Audit", "Collaboration", "Sketching"],
  ui: ["Visual Design", "Style Guides", "Design Systems", "UI Directions", "Responsive Design", "Interaction Design", "Typography", "Color Theory", "Iconography"],
  tools: ["figma", "ps", "ai", "ae", "protopie", "zeplin", "miro", "framer", "chatgpt"],
};

// Names, roles and quotes as on page 29 of the PDF (lightly copy-edited).
export const voices = [
  {
    name: "Bassel Mahdy",
    role: "Senior Product Designer at Banque Misr",
    quote: "Consistently impressed by his artistic talent and strong work ethic. Ahmed delivered designs that were both visually stunning and user-friendly, and always went above and beyond.",
  },
  {
    name: "Hussein Gaber",
    role: "Head of Design at Tremoloo · UMC, CXAC",
    quote: "Kudos, Ahmed. It's honestly hard to explain how integral you are to this team.",
  },
  {
    name: "Saeeda Mohamed",
    role: "Software Quality Control Team Lead",
    quote: "The most talented and creative product designer I have worked with. Strong experience with usability across different business domains.",
  },
  {
    name: "Nehal Mohsen",
    role: "NN/g UX Certified · Senior UX Designer",
    quote: "A design joker with an incredible sense of UI. Design thinking, ideation and brainstorming are his games; he always has insightful solutions.",
  },
  {
    name: "Mohamed Hany",
    role: "Senior UI/UX Designer at stc",
    quote: "His constant communication helped lift our spirits in challenging situations. He is extremely generous with his time and often volunteers to help others.",
  },
  {
    name: "Deyaa Eldeen Hassan",
    role: "Senior Product Designer at AZM X",
    quote: "Ahmed has a great spirit and a friendly way of giving feedback, and a creative problem-solving mentality that makes him of great value to the team.",
  },
  {
    name: "Ibrahim Elfeky",
    role: "Senior Product Designer at NHC",
    quote: "A quick learner, kind and very helpful. He never holds back, and he is one of the designers you will never forget working with.",
  },
  {
    name: "Asmaa Elfauomy",
    role: "Product Manager II, Products Geek",
    quote: "One of the best designers I have worked with, so talented and hard-working.",
  },
];
