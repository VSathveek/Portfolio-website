/**
 * Projects. `featured` surfaces on the homepage and at the top of /projects.
 * `repo`/`demo` render as links only when present — several recent repos still
 * need their exact URLs (see TODO(me) notes below), so they're left undefined
 * rather than guessed.
 */
export type Project = {
  title: string;
  description: string;
  tags: string[];
  year?: string;
  featured?: boolean;
  repo?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: "MediLens — Biomedical Question Answering",
    description:
      "A retrieval-augmented pipeline over PubMed: 262K abstract chunks embedded with a PubMedBERT encoder and indexed in FAISS, with fine-tuned BioBERT/PubMedBERT NER and chained cross-encoder reranking and generation (BioGPT/Flan-T5, local models via Ollama) returning structured JSON. Deployed as a Dockerized FastAPI service.",
    tags: ["PyTorch", "HuggingFace", "FAISS", "FastAPI", "Docker"],
    featured: true,
    // TODO(me): add the MediLens GitHub URL.
  },
  {
    title: "Student Performance Analysis",
    description:
      "End-to-end EDA on student demographic and academic data, engineering features and identifying key drivers of exam performance, then a modular ML pipeline comparing regression models — the best deployed as a Flask app for on-demand score prediction.",
    tags: ["Python", "Pandas", "Scikit-learn", "CatBoost", "Flask"],
    featured: true,
    // TODO(me): add the Student Performance Analysis GitHub URL.
  },
  {
    title: "Smart Environment Dashboard",
    description:
      "A full-stack system for real-time monitoring of environmental sensor data, with interactive dashboards of parameter trends, threshold-based alerting, and device-management workflows that convert raw sensor streams into actionable signals.",
    tags: ["TypeScript", "React", "Node.js", "REST APIs"],
    featured: true,
    // TODO(me): add the Smart Environment Dashboard GitHub URL.
  },
  {
    title: "Empathetic AI Model",
    description:
      "A RoBERTa-based emotion-detection model classifying text into anger, joy, fear, and sadness.",
    tags: ["NLP", "Machine Learning", "Python"],
    repo: "https://github.com/VSathveek/empathetic_ai_model",
  },
  {
    title: "Fair Graph Algorithms",
    description:
      "Research on multi-weight edge graphs with scalarized cost functions, exploring fairness in graph-based algorithms.",
    tags: ["Graph Theory", "Algorithms", "Research"],
    repo: "https://github.com/VSathveek/Fair-graph-based-algorithms",
  },
  {
    title: "ToDo Management Website",
    description: "A task-management system with analytics, file attachments, and notifications.",
    tags: ["Django", "JavaScript", "SQLite"],
    repo: "https://github.com/VSathveek/ToDo",
  },
  {
    title: "Attendance App",
    description: "An Excel-based attendance-tracking app with reporting features.",
    tags: ["Flutter", "Local Storage"],
    repo: "https://github.com/VSathveek/Attendance-App",
  },
  {
    title: "Mess App",
    description: "A role-based food-ordering system with QR payments and an admin dashboard.",
    tags: ["Flutter", "Firebase", "UPI Payments"],
    repo: "https://github.com/pardhu-423141/mess_app",
  },
];
