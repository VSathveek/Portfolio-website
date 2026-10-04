/**
 * Technical skills, grouped for the CV page.
 *
 * Ordered so the document and retrieval work reads first, since that is what
 * the rest of the site is built around. Only list things that appear in the
 * resume or in public work.
 */
export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Document AI & retrieval",
    items: [
      "RAG",
      "Docling",
      "Unstructured",
      "PDF/DOCX/HTML parsing",
      "OCR",
      "Chunking strategies",
      "FAISS",
      "Cross-encoder reranking",
      "sentence-transformers",
      "LLM APIs",
    ],
  },
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "C++", "Rust", "Bash"],
  },
  {
    label: "Backend & APIs",
    items: [
      "FastAPI",
      "Django",
      "Node.js",
      "Express.js",
      "REST APIs",
      "WebRTC",
      "Celery/background jobs",
    ],
  },
  {
    label: "ML & deep learning",
    items: [
      "PyTorch",
      "HuggingFace Transformers",
      "scikit-learn",
      "XGBoost",
      "NumPy",
      "pandas",
      "TransformerLens",
    ],
  },
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "Flutter"],
  },
  {
    label: "Data stores",
    items: ["PostgreSQL", "MongoDB", "SQLite", "MySQL", "Supabase"],
  },
  {
    label: "Security",
    items: [
      "JWT authentication",
      "OTP verification",
      "Role-based access control",
      "Data validation",
    ],
  },
  {
    label: "Cloud & tooling",
    items: ["AWS S3", "Docker", "Vercel", "Linux", "Git/GitHub", "Ollama", "Jupyter"],
  },
];
