/**
 * Core biographical content, sourced from the owner's 2026 resume.
 * Do not invent facts here. Mark any gap with a TODO(me) comment.
 */
export const profile = {
  /** Short homepage bio. Plain, first-person, content-first. */
  bio: [
    "I work on the unglamorous layer of AI systems: getting real documents, scanned invoices, multi-column PDFs and messy HTML, into a shape a language model can actually reason over. It is where most retrieval pipelines quietly lose their accuracy.",
    "I have shipped fixes upstream into Docling (IBM) and Unstructured, two of the libraries that layer is usually built on, and built retrieval and extraction systems through internships at IIT Ropar, NIT Andhra Pradesh and Intants. Alongside that I run mechanistic interpretability experiments on transformer language models, with a manuscript in preparation.",
    "I am a Computer Science undergraduate at NIT Andhra Pradesh (B.Tech, 2023 to 2027), and I take on remote contract work.",
  ],

  /**
   * What a client can actually hire for: concrete problems, not skills.
   * Rendered on the homepage under "What I can help with".
   */
  services: [
    {
      title: "Document ingestion that holds up",
      body: "PDF, DOCX, HTML and scanned input parsed into clean, structured text, with tables, reading order, headers and hyphenation preserved rather than silently mangled.",
    },
    {
      title: "RAG pipelines that retrieve the right thing",
      body: "Chunking, embedding and reranking tuned against your own corpus, with an eval harness so a change is measured rather than guessed at.",
    },
    {
      title: "Extraction from structured documents",
      body: "Invoices, receipts and trade paperwork turned into validated fields, with duplicate and authenticity checks before anything is trusted downstream.",
    },
    {
      title: "Python and FastAPI services around the model",
      body: "The API, the queue, the storage and the deployment that turn a working notebook into something a product can call.",
    },
  ],

  /** Research interests, most central first. */
  interests: [
    "Mechanistic interpretability of transformers",
    "Retrieval-augmented generation",
    "Document understanding and extraction",
    "Natural language processing",
    "Graph-based analysis of relational data",
    "Applied machine learning",
  ],

  education: {
    school: "National Institute of Technology, Andhra Pradesh",
    degree: "B.Tech, Computer Science and Engineering",
    period: "Aug 2023 to May 2027",
    detail: "CGPA 8.75 / 10.0",
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
    "Ranked in the top 1.6% of JEE Mains (17,801 of 1.1M candidates).",
    "Led sponsorship outreach for Techkriya, raising INR 1 lakh through industry outreach and stakeholder presentations.",
    "Awarded the Meritorious Idea Award by the Institute Innovation Council.",
  ],
} as const;
