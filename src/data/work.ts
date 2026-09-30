// Case studies from the PDF (pages 9–26). Copy is tightened; facts are unchanged.

export type Section = { title: string; items: { head?: string; text: string }[] };

export type Project = {
  slug: string;
  name: string;
  client?: string;
  category: string;
  duration: string;
  summary: string;
  overview: string;
  cover: string;
  images: string[];
  sections: Section[];
  impact?: { value: number; suffix: string; label: string; text: string }[];
  link?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    slug: "stc-design-system",
    name: "stc Design System",
    client: "stc",
    category: "Design system",
    duration: "1 year",
    summary: "One system for every stc internal platform.",
    overview:
      "The journey began with a detailed exploration of stc's current solutions. Evaluating function after function surfaced one common issue: a lack of design consistency that was fragmenting the user experience.",
    cover: "/img/stc-ds-1.webp",
    images: ["/img/stc-ds-1.webp"],
    sections: [
      {
        title: "Design process",
        items: [
          { text: "Defined the core of the system: typography, colour, UI components and interaction patterns." },
          { text: "Built a comprehensive library of reusable assets and components in Figma." },
          { text: "Delivered the system to development teams through workshops, with ongoing support during implementation." },
        ],
      },
    ],
    impact: [
      { value: 30, suffix: "%", label: "Design consistency", text: "fewer design inconsistencies across all platforms." },
      { value: 20, suffix: "%", label: "Development efficiency", text: "less development time, with ready-to-use components and styles." },
      { value: 15, suffix: "%", label: "User satisfaction", text: "more positive feedback on the improved interface in user testing." },
    ],
  },
  {
    slug: "stc-voting",
    name: "Demand Committee",
    client: "stc",
    category: "Voting app",
    duration: "3 weeks",
    summary: "Secure, compliant voting for committees and events.",
    overview:
      "A voting app that protects the security and integrity of voting in events such as GSS and project reviews. It offers a secure, compliant experience and integrates with Hub Inbox, SMS and Outlook Calendar.",
    cover: "/img/stc-voting.webp",
    images: ["/img/stc-voting.webp"],
    sections: [
      {
        title: "What it does",
        items: [
          { head: "Secure by design", text: "Every vote is protected end-to-end and fully compliant." },
          { head: "Where people already are", text: "Invitations and results flow through Hub Inbox, SMS and Outlook Calendar." },
        ],
      },
    ],
  },
  {
    slug: "ejar",
    name: "Ejar",
    category: "Rental portal",
    duration: "2 years",
    summary: "Leasing property in Saudi Arabia, fully online.",
    overview:
      "An integrated electronic network launched in 2018 that streamlined leasing property with a secure, convenient way to conclude leases online, using a standard contract certified by the Ministry of Justice.",
    cover: "/img/ejar-1.webp",
    images: ["/img/ejar-1.webp", "/img/ejar-2.webp"],
    link: { label: "eservices.ejar.sa", href: "https://eservices.ejar.sa" },
    sections: [
      {
        title: "Responsibilities",
        items: [
          { head: "Sketch → Figma", text: "Led the migration to Figma for better collaboration and a streamlined process." },
          { head: "Component rebuild", text: "Rebuilt core components to current standards with a modular, scalable approach." },
          { head: "Engagement", text: "Evaluated and refined existing features to raise engagement and satisfaction." },
          { head: "BRD to design", text: "Translated business requirement documents into clear, intuitive solutions." },
          { head: "Delivery", text: "Worked closely with cross-functional teams to fold design into the development pipeline." },
        ],
      },
    ],
  },
  {
    slug: "my-orange",
    name: "My Orange",
    client: "Orange",
    category: "Telecom",
    duration: "10 weeks",
    summary: "Subscriptions, bills and recharges, finally easy.",
    overview:
      "A mobile app that empowers Orange users with streamlined management of subscriptions, bill payments, recharges and more. The goal: raise engagement and satisfaction, and build a design system to keep the app consistent.",
    cover: "/img/orange-1.webp",
    images: ["/img/orange-1.webp", "/img/orange-2.webp", "/img/orange-3.webp"],
    sections: [
      {
        title: "What we found",
        items: [
          { text: "Users were proficient with bundle details and consumption monitoring." },
          { text: "Paying bills and Orange Cash had low engagement." },
          { text: "Changing packages and recharging saw moderate engagement." },
        ],
      },
      {
        title: "What we did",
        items: [
          { head: "UX expert audit", text: "Pinpointed usability issues using the 10 heuristics, UX laws, UI principles and psychology." },
          { head: "Ideation", text: "Explored with the team how to make features more discoverable and user-friendly." },
          { head: "New UI direction", text: "A fresh, modern UI to revitalise the app's visual identity." },
          { head: "Usability testing", text: "Validated the enhancements with real users and gathered feedback." },
        ],
      },
    ],
  },
  {
    slug: "budget",
    name: "Budget",
    client: "Budget Saudi Arabia",
    category: "Car rental",
    duration: "4 weeks",
    summary: "Book a car anywhere in KSA, extras included.",
    overview:
      "A car-rental app for booking at any Budget location in KSA, with handy extras like GPS, mobile Wi-Fi and child seats added right in the booking.",
    cover: "/img/budget-1.webp",
    images: ["/img/budget-1.webp", "/img/budget-2.webp"],
    sections: [
      {
        title: "How it was built",
        items: [
          { head: "Requirements", text: "Defined scope with the business team through user stories and use cases." },
          { head: "Discovery", text: "Research and competitive analysis to map competitors' strengths and weaknesses." },
          { head: "Wireframes", text: "Built from the stories and validated with stakeholders." },
          { head: "UI design", text: "Moodboards for style, type, illustration and icons; the chosen direction was then taken to full UI." },
          { head: "Prototype", text: "Usability-tested with diverse user groups." },
          { head: "Handoff", text: "Walked developers through the implementation with every asset they needed." },
        ],
      },
    ],
  },
  {
    slug: "flash",
    name: "Flash",
    category: "Payments",
    duration: "6 weeks",
    summary: "Instant payments without the mundane steps.",
    overview:
      "Flash is an instant payment app approved by the Central Bank of Egypt, with every payment processed securely by Banque Misr. The goal was a user-centric app that makes paying easier and saves the time lost to confusing steps.",
    cover: "/img/flash-1.webp",
    images: ["/img/flash-1.webp"],
    sections: [
      {
        title: "Focus",
        items: [
          { head: "Send, request, split", text: "Money transfer in one tap from the home screen." },
          { head: "Pay bills in a flash", text: "Mobile, electricity and DSL bills in the same place." },
        ],
      },
    ],
  },
  {
    slug: "bona",
    name: "BONA Invest",
    category: "Fintech",
    duration: "8 weeks",
    summary: "Africa's first zero-commission robo-advisor.",
    overview:
      "BONA is the first zero-commission neo-brokerage and robo-advisor in Africa: a one-stop investment shop for digital millennials and Gen Z, with 3,000+ US securities from a $1 minimum, local payment gateways and local ID.",
    cover: "/img/bona-1.webp",
    images: ["/img/bona-1.webp", "/img/bona-2.webp"],
    sections: [
      {
        title: "Features",
        items: [
          { head: "Automated portfolios", text: "Portfolio management tailored to your values and goals." },
          { head: "Values-driven investing", text: "Halal, green or crypto options." },
          { head: "Smart diversification", text: "A dashboard for intelligent, diversified strategies." },
          { head: "Community", text: "A community of investors sharing financial literacy." },
          { head: "Real-time markets", text: "The latest market news, 24/7." },
        ],
      },
    ],
  },
  {
    slug: "otida",
    name: "Otida",
    category: "Health tech",
    duration: "6 weeks",
    summary: "A complete care model for people with diabetes.",
    overview:
      "Otida is a complete solution for managing diabetes: a health-tech app with an innovative, efficient care model. Its multidisciplinary approach focuses on reversing and preventing complications.",
    cover: "/img/otida-1.webp",
    images: ["/img/otida-1.webp", "/img/otida-2.webp"],
    sections: [
      {
        title: "How it was built",
        items: [
          { head: "Requirements", text: "Defined with stakeholders." },
          { head: "Discovery", text: "Research and competitive analysis." },
          { head: "Wireframes", text: "Validated with stakeholders against expectations." },
          { head: "UI design", text: "Moodboard-led direction, then full UI." },
          { head: "Handoff", text: "Every asset developers needed." },
        ],
      },
    ],
  },
  {
    slug: "check",
    name: "Check",
    category: "Operations portal",
    duration: "7 weeks",
    summary: "Audits and inspections with the full picture.",
    overview:
      "An all-in-one platform for auditing, inspections and operational-readiness management. Real-time visibility uncovers process gaps, speeds up inspections and generates insightful reports instantly.",
    cover: "/img/check-1.webp",
    images: ["/img/check-1.webp"],
    sections: [],
  },
  {
    slug: "jinni",
    name: "Jinni",
    category: "Home services",
    duration: "6 weeks",
    summary: "Trusted cleaners, without the waiting.",
    overview:
      "Jinni provides residential and commercial cleaning with trusted, experienced, fully equipped professionals, so nobody has to spend the day waiting for the cleaners to show up.",
    cover: "/img/jinni-1.webp",
    images: ["/img/jinni-1.webp"],
    sections: [],
  },
  {
    slug: "egyptian-streets",
    name: "Egyptian Streets",
    category: "News",
    duration: "3 weeks",
    summary: "Egypt's leading independent English media.",
    overview:
      "Egyptian Streets (ES Media Network FZ LLC) is Egypt's leading independent English-language media organisation, organically reaching more than two million people a month.",
    cover: "/img/es-1.webp",
    images: ["/img/es-1.webp"],
    sections: [],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
