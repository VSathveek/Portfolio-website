/**
 * Research and professional experience, most recent first.
 *
 * Sourced from the 2026 resume. Keep the claims here identical to the PDF in
 * /public: a visitor who downloads the CV should not find a different story.
 * Do not add percentage improvements that the resume does not state.
 */
export type Experience = {
  org: string;
  role: string;
  location: string;
  period: string;
  /** True for research-focused roles (used to group on the Research page). */
  research?: boolean;
  /** One line on what the organisation is, for readers who won't know. */
  context?: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    org: "Intants Pvt Ltd",
    role: "Software Engineer Intern",
    location: "Remote",
    period: "May 2026 to July 2026",
    context: "AI invoice processing platform",
    points: [
      "Built Python/FastAPI REST APIs, React screens and a PostgreSQL schema for a platform covering purchase orders, goods receipts and vendors.",
      "Built invoice data extraction, plus an authenticity check that verifies each invoice against the database and other sources so suspicious or duplicate invoices are flagged before they are processed.",
    ],
  },
  {
    org: "National Institute of Technology, Andhra Pradesh",
    role: "Back End Developer Intern",
    location: "Tadepalligudem, Andhra Pradesh",
    period: "Aug 2025 to Dec 2025",
    points: [
      "Built REST APIs for a question recommendation service that prioritises and tags questions using each student's profile and past performance.",
      "Wrote Python (pandas, NumPy) pipelines and dashboards that turn user activity into topic-level trends, working with the frontend team through Git and GitHub.",
    ],
  },
  {
    org: "Indian Institute of Technology, Ropar",
    role: "Research Intern",
    location: "Ropar, Punjab",
    period: "May 2025 to Aug 2025",
    research: true,
    points: [
      "Modelled large relational datasets as graphs and wrote processing logic to find relationships and dependencies that were not visible in the raw tables.",
      "Built the backend data processing behind an interactive web interface, with filtering and toggling so researchers could explore the data in real time.",
    ],
  },
];
