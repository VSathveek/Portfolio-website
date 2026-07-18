/** Research & professional experience, most recent first (from the 2026 resume). */
export type Experience = {
  org: string;
  role: string;
  location: string;
  period: string;
  /** True for research-focused roles (used to group on the Research page). */
  research?: boolean;
  points: string[];
};

export const experience: Experience[] = [
  {
    org: "Intants Pvt Ltd",
    role: "Software Engineer Intern",
    location: "Remote",
    period: "May 2026 – Present",
    points: [
      "Automated extraction, cleaning, validation, and transformation of vendor invoice data on a full-stack platform (Python/FastAPI, PostgreSQL, React), removing manual data-entry effort across the finance workflow.",
      "Designed a normalized PostgreSQL schema and wrote optimized SQL for invoice ingestion and line-item reconciliation, improving accuracy and throughput under concurrent load.",
      "Built role-based review and approval dashboards with real-time status tracking, giving the finance team clear visibility into invoice pipelines.",
    ],
  },
  {
    org: "National Institute of Technology, Andhra Pradesh",
    role: "Data & Backend Developer Intern",
    location: "Tadepalligudem, Andhra Pradesh",
    period: "Aug 2025 – Dec 2025",
    points: [
      "Built data-analytics pipelines in Python (pandas, NumPy) over user activity and performance data, and delivered interactive dashboards of topic-level trends that reduced student preparation time by ~30%.",
      "Designed a question prioritization and tagging system driven by user profiles and historical performance, powering personalized recommendations that improved practice efficiency by ~20%.",
    ],
  },
  {
    org: "Indian Institute of Technology, Ropar",
    role: "Research Intern",
    location: "Ropar, Punjab",
    period: "May 2025 – Aug 2025",
    research: true,
    points: [
      "Modeled large relational datasets as graphs to analyze relationships and dependencies, surfacing network patterns and structural insights not visible in raw tabular data.",
      "Built an interactive visualization interface with filtering and toggling for real-time exploration of relational data, improving insight discovery for researchers.",
    ],
  },
];
