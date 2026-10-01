// Case studies from the PDF (pages 9–26). Copy is tightened; facts are unchanged.

// Covers are the consistent mockups from scripts/make-mockups.py; images[1..] are the original PDF mockups (case-study gallery).
export type Section = { title: string; intro?: string; items: { head?: string; text?: string }[] };

export type Project = {
  slug: string;
  name: string;
  client?: string;
  category: string;
  duration: string;
  summary: string;
  overview: string;
  /** Heading for the overview block (defaults to "Overview"). */
  overviewTitle?: string;
  cover: string;
  /** Final mockup supplied by Ahmed; wins over the placeholder and the generated cover. */
  thumb?: string;
  images: string[];
  sections: Section[];
  impact?: { value: number; suffix: string; label: string; text: string }[];
  link?: { label: string; href: string };
};

// Company context shared by every case study done there (Ahmed's own words).
const STC_ROLE: Section = {
  title: "About stc & my role",
  intro:
    "stc is a leading telecommunications company based in Saudi Arabia, with a strong commitment to digital transformation and innovation, evident in the exceptional digital experiences its apps deliver.",
  items: [
    { text: "Translating ideas and business requirements into mind maps, user flows, low- and high-fidelity wireframes, and prototypes." },
    { text: "Evaluating UX using heuristic evaluation and UX laws." },
    { text: "Collaborating with team members to ideate and achieve the best user experience." },
    { text: "Creating design systems." },
    { text: "Communicating design ideas and prototypes to developers." },
  ],
};

export const projects: Project[] = [
  // Not from the PDF: webook's white-label build for SC Braga (screens from Test/scbraga-app-landing).
  {
    slug: "sc-braga",
    name: "SC Braga",
    client: "SC Braga",
    category: "White-label app & website",
    duration: "2026",
    summary: "The club's official app and website, on webook's white-label platform.",
    overviewTitle: "Our design approach",
    overview:
      "We follow a structured, user-centered process to ensure a modern, intuitive and scalable digital experience for SC Braga fans, while aligning with business goals and technical constraints.",
    cover: "/img/mockups/sc-braga.webp",
    thumb: "/img/mockups/sc-braga-final.webp",
    images: ["/img/mockups/sc-braga.webp", "/img/scbraga/tickets.webp", "/img/scbraga/live.webp", "/img/scbraga/news.webp", "/img/scbraga/visit.webp"],
    sections: [
      {
        title: "Old version audit",
        intro: "We evaluated the current experience across usability, navigation, content hierarchy and interaction clarity to identify the key weak points to fix.",
        items: [],
      },
      {
        title: "Homepage audit",
        items: [
          { text: "The above-the-fold area is overcrowded with competing elements (hero banners, upcoming games, standings, tour/FAP), which increases cognitive load and makes it hard to know where to focus first." },
          { text: "Primary banners are hard to navigate: the interaction for switching between them is neither discoverable nor intuitive." },
          { text: "Upcoming-games navigation is hard to use: very small tap areas overlap the background, reducing tap accuracy, especially on mobile." },
          { text: "The “Learn more” action lacks clear affordance, so it isn’t obvious that it’s clickable." },
          { text: "Scrolling within the standings section isn’t intuitive, adding friction when users explore more content." },
          { text: "Side-menu icons lack clarity and recognizability, which hurts wayfinding and steepens the learning curve for first-time users." },
          { text: "The hero banner competes with the secondary content on the right, weakening the hierarchy and diluting the primary message." },
          { text: "Match info exists, but its urgency isn’t emphasized." },
          { text: "Live and upcoming match indicators are visually weak." },
          { text: "Sports fans expect a match-first layout." },
          { text: "News dominates over fixtures." },
          { text: "External redirects (tickets, store) reset the user’s context." },
          { text: "There is no unified back navigation." },
          { text: "There is no dominant primary action." },
          { text: "The CTA’s default state looks like its disabled state." },
          { text: "It works as an informative website rather than a task-led product." },
        ],
      },
      {
        title: "Main UX issues",
        items: [
          { head: "Visual hierarchy breakdown", text: "Multiple elements compete for attention with equal visual weight, violating hierarchy and focus principles." },
          { head: "Weak CTA salience", text: "Key actions (Tickets, Shop, Membership) are not visually dominant. This breaks CTA and conversion patterns and reduces action discoverability." },
          { head: "IA–mental model mismatch", text: "The menu structure reflects internal organization, not user tasks. It conflicts with Jakob’s Law and recognition-based navigation patterns." },
          { head: "Content-first vs task-first", text: "The website favors content exposure over primary user goals. It lacks task-focused design and clear conversion paths." },
        ],
      },
      {
        title: "Benchmarking",
        intro: "We analyzed top-tier clubs (FC Barcelona, Manchester United, Liverpool, Juventus, AC Milan, Inter Milan, Paris Saint-Germain, Bayern Munich, Manchester City, Real Madrid and more) to identify the “Braga Edge.”",
        items: [],
      },
      {
        title: "What we did",
        items: [
          { head: "New information architecture", text: "We restructured pages and features using a user-centered approach and card-sorting workshops to create clearer navigation and IA, helping users find information and complete tasks more efficiently." },
        ],
      },
      {
        title: "Inside the app",
        items: [
          { head: "Tickets", text: "Digital tickets with QR entry, gate, block, row and seat, parking details, and one tap to send a ticket to a friend." },
          { head: "Live matchday", text: "Live score, line-ups, statistics and minute-by-minute commentary, with news and videos in the same match view." },
          { head: "News", text: "Club news and interviews in an editorial layout set in the club's own typeface." },
          { head: "Visits", text: "Stadium tours booked in the app, with the story and gallery of the Braga Municipal Stadium." },
        ],
      },
      {
        title: "One platform",
        items: [
          { text: "The same white-label product powers both the app and scbraga.pt, themed to the club's crest, colours and type. The app has been live on iOS and Android since July 2026, in Portuguese, English, Spanish, French and Arabic." },
        ],
      },
    ],
    link: { label: "scbraga.pt", href: "https://scbraga.pt" },
  },
  // Not from the PDF: Ahmed's feature work at webook (Product Design Lead, 2024 – now).
  {
    slug: "webook",
    name: "webook",
    client: "webook",
    category: "Ticketing & entertainment platform",
    duration: "2024 – now",
    summary: "Booking journeys, new features and the design system for an all-in-one events platform.",
    overviewTitle: "The platform",
    overview:
      "webook.com is an all-in-one social engagement platform for booking experiences and online tickets for the most interesting events and activities.",
    cover: "/img/mockups/webook-final.webp",
    thumb: "/img/mockups/webook-final.webp",
    images: ["/img/mockups/webook-final.webp"],
    sections: [
      {
        title: "My role",
        items: [
          { text: "Enhanced the core ticket booking journey, improving usability and increasing conversion rates." },
          { text: "Conducted UX audits and tests to identify friction points, and implemented design solutions that improved user satisfaction." },
          { text: "Designed new features end to end, collaborating closely with product managers and developers to ensure feasibility and user value." },
          { text: "Created and maintained scalable components in the webook design system, enabling faster development and better consistency across platforms." },
          { text: "Designed white- and grey-label landing pages tailored to the business needs of high-profile partners and entertainment brands." },
          { text: "Communicated design concepts, user flows and interactions to developers for a seamless handoff and implementation." },
        ],
      },
      {
        title: "Features I designed",
        items: [
          { head: "Social login" },
          { head: "Subscriptions" },
          { head: "Cashless" },
          { head: "Vouchers & gift cards" },
          { head: "Affiliate program" },
          { head: "Cruise booking journey" },
          { head: "Accessibility tickets" },
        ],
      },
    ],
    link: { label: "webook.com", href: "https://webook.com" },
  },
  // The stc design system and the Demand Committee voting app, merged into one stc case study (Ahmed, 2026-10-01).
  {
    slug: "stc",
    name: "stc",
    client: "stc",
    category: "Design system & voting app",
    duration: "2023 – 2024",
    summary: "One design system for every stc internal platform, and a secure voting app for its Demand Committee.",
    overview:
      "Two projects at stc: a design system that brought consistency to the company's internal platforms, and Demand Committee, a secure voting app for committees and events.",
    cover: "/img/mockups/stc-design-system.webp",
    thumb: "/img/mockups/stc-voting-final.webp",
    images: ["/img/mockups/stc-voting-final.webp", "/img/mockups/stc-design-system-final.webp", "/img/stc-ds-1.webp", "/img/stc-voting.webp"],
    sections: [
      STC_ROLE,
      {
        title: "Design system",
        intro:
          "The journey began with a detailed exploration of stc's current solutions. Evaluating function after function surfaced one common issue: a lack of design consistency that was fragmenting the user experience.",
        items: [
          { text: "Defined the core of the system: typography, colour, UI components and interaction patterns." },
          { text: "Built a comprehensive library of reusable assets and components in Figma." },
          { text: "Delivered the system to development teams through workshops, with ongoing support during implementation." },
        ],
      },
      {
        title: "Demand Committee voting app",
        intro:
          "A voting app that protects the security and integrity of voting in events such as GSS and project reviews. It offers a secure, compliant experience and integrates with Hub Inbox, SMS and Outlook Calendar.",
        items: [
          { head: "Secure by design", text: "Every vote is protected end-to-end and fully compliant." },
          { head: "Where people already are", text: "Invitations and results flow through Hub Inbox, SMS and Outlook Calendar." },
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
    slug: "ejar",
    name: "Ejar",
    category: "Rental portal",
    duration: "2 years",
    summary: "Leasing property in Saudi Arabia, fully online.",
    overview:
      "An integrated electronic network launched in 2018 that streamlined leasing property with a secure, convenient way to conclude leases online, using a standard contract certified by the Ministry of Justice.",
    cover: "/img/mockups/ejar.webp",
    thumb: "/img/mockups/ejar-final.webp",
    images: ["/img/mockups/ejar.webp", "/img/ejar-1.webp", "/img/ejar-2.webp"],
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
    cover: "/img/mockups/my-orange.webp",
    thumb: "/img/mockups/my-orange-final.webp",
    images: ["/img/mockups/my-orange.webp", "/img/orange-1.webp", "/img/orange-2.webp", "/img/orange-3.webp"],
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
    cover: "/img/mockups/budget.webp",
    thumb: "/img/mockups/budget-final.webp",
    images: ["/img/mockups/budget.webp", "/img/budget-1.webp", "/img/budget-2.webp"],
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
    cover: "/img/mockups/flash.webp",
    thumb: "/img/mockups/flash-final.webp",
    images: ["/img/mockups/flash.webp", "/img/flash-1.webp"],
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
    cover: "/img/mockups/bona.webp",
    thumb: "/img/mockups/bona-final.webp",
    images: ["/img/mockups/bona.webp", "/img/bona-1.webp", "/img/bona-2.webp"],
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
    cover: "/img/mockups/otida.webp",
    thumb: "/img/mockups/otida-final.webp",
    images: ["/img/mockups/otida.webp", "/img/otida-1.webp", "/img/otida-2.webp"],
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
    cover: "/img/mockups/check.webp",
    images: ["/img/mockups/check.webp", "/img/check-1.webp"],
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
    cover: "/img/mockups/jinni.webp",
    images: ["/img/mockups/jinni.webp", "/img/jinni-1.webp"],
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
    cover: "/img/mockups/egyptian-streets.webp",
    images: ["/img/mockups/egyptian-streets.webp", "/img/es-1.webp"],
    sections: [],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
