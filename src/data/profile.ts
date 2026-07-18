/**
 * Core biographical content, sourced from the owner's 2026 resume.
 * Do not invent facts here — mark any gap with a TODO(me) comment.
 */
export const profile = {
  /** Short homepage bio — plain, first-person, content-first. */
  bio: [
    "I'm a Computer Science undergraduate at NIT Andhra Pradesh (B.Tech, 2023–2027). My work centers on machine learning and its internals.",
    "I build retrieval-augmented systems over scientific literature and run mechanistic interpretability experiments on transformer language models, with a manuscript in preparation. Alongside research, I've shipped full-stack data platforms through internships at IIT Ropar, NIT Andhra Pradesh, and Intants.",
  ],

  /** Research interests, most central first. */
  interests: [
    "Mechanistic interpretability of transformers",
    "Retrieval-augmented generation",
    "Natural language processing",
    "Graph-based analysis of relational data",
    "Applied machine learning",
  ],

  education: {
    school: "National Institute of Technology, Andhra Pradesh",
    degree: "B.Tech, Computer Science and Engineering",
    period: "Aug 2023 – May 2027",
    detail: "CGPA 8.76 / 10.0",
    location: "Tadepalligudem, Andhra Pradesh",
    coursework: [
      "Applied Machine Learning",
      "Natural Language Processing",
      "Probability & Statistics",
      "Data Structures & Algorithms",
      "Design & Analysis of Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
    ],
  },

  achievements: [
    "Contest rating of 1570 on LeetCode, with regular competitive-programming participation.",
    "Ranked in the top 1.6% of JEE Mains (17,801 / 1.1M candidates).",
    "Led Techkriya sponsorships, securing ₹1 lakh through industry outreach and stakeholder presentations.",
    "Awarded the Meritorious Idea Award by the Institute Innovation Council.",
  ],
} as const;
