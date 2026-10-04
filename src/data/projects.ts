/**
 * Projects. `featured` surfaces on the homepage and at the top of /projects.
 *
 * Ordering is deliberate: document-AI and retrieval work first, because that
 * is the thread the open-source contributions also sit on. Every entry links
 * to a real repository. If a project has no public repo yet, leave it out
 * rather than shipping a dead card.
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
    title: "MediLens: Biomedical Question Answering",
    description:
      "A retrieval-augmented medical assistant: PubMed abstracts chunked, embedded and indexed for search, with Gemini-driven symptom triage and medical-term extraction grounded in that corpus rather than in model memory. OCR reads prescription images into the same pipeline. FastAPI backend, React frontend.",
    tags: ["RAG", "FastAPI", "React", "OCR", "Gemini API"],
    featured: true,
    repo: "https://github.com/VSathveek/MediLens",
  },
  {
    title: "FIDES: Trade-Document Risk Screening",
    description:
      "Upload three trade documents and get a plain-language fraud and compliance risk brief in about a minute. A multi-stage pipeline cross-checks the documents against each other and surfaces the inconsistencies a customs broker would otherwise have to catch by hand.",
    tags: ["Document AI", "Python", "LLM Pipeline", "Compliance"],
    featured: true,
    repo: "https://github.com/VSathveek/FIDES",
  },
  {
    title: "TalkCircle: Audio and Video Rooms with Recording",
    description:
      "A peer-to-peer room platform over WebRTC for low-latency audio and video. Each participant is recorded locally so the final output doesn't degrade with call quality; a background job uploads the chunks to S3, stitches them with FFmpeg, and emails the finished recording.",
    tags: ["WebRTC", "Node.js", "TypeScript", "AWS S3", "FFmpeg"],
    featured: true,
    repo: "https://github.com/VSathveek/TalkCircle",
  },
  {
    title: "Driftmesh: Off-Grid P2P Mesh Chat",
    description:
      "Serverless messaging over Bluetooth LE with an optional Nostr relay, so a group stays connected with no infrastructure at all. Rust core for the mesh and crypto, Flutter UI, Noise-protocol end-to-end encryption.",
    tags: ["Rust", "Flutter", "Bluetooth LE", "Noise Protocol"],
    featured: true,
    repo: "https://github.com/VSathveek/bluetoothBasedChatApp",
  },
  {
    title: "Real-Time Anomaly & Fraud Detection",
    description:
      "Fraud detection on data with extreme class imbalance, combining XGBoost, Isolation Forest and an autoencoder, served behind a latency-aware FastAPI endpoint so scoring stays inside a real-time budget.",
    tags: ["XGBoost", "Anomaly Detection", "FastAPI", "Time Series"],
    repo: "https://github.com/VSathveek/Time-Series_tabular_Data_Real_Time_Anomaly_Fraud_Detection",
  },
  {
    title: "Automated Diagnostic Assistant",
    description:
      "Deep-learning triage for medical images (chest X-rays and skin lesions) with Grad-CAM overlays, so a prediction arrives with the region that drove it rather than as a bare label. Streamlit demo.",
    tags: ["PyTorch", "Computer Vision", "Grad-CAM", "Streamlit"],
    repo: "https://github.com/VSathveek/Computer-Vision_Healthcare-Automated-Diagnostic-Assistant",
  },
  {
    title: "Multi-Agent Robot Soccer",
    description:
      "2D multi-agent soccer trained with deep reinforcement learning (IPPO, MAPPO, SAC). Python training and a TypeScript browser runtime are kept behaviourally identical by a cross-language conformance harness.",
    tags: ["Reinforcement Learning", "PyTorch", "TypeScript", "Multi-Agent"],
    repo: "https://github.com/VSathveek/RLBasedSoccerGame",
  },
  {
    title: "Mechanistic Interpretability Research",
    description:
      "Ongoing experiments reverse-engineering the internal circuits of transformer language models, reading what the computation is actually doing rather than treating the model as a black box.",
    tags: ["Interpretability", "TransformerLens", "PyTorch", "Research"],
    repo: "https://github.com/VSathveek/Research_On_Mechanistic_Interpretability",
  },
  {
    title: "BrainWave: EdTech Platform",
    description:
      "A full-stack course platform with an instructor dashboard and student catalog, secured with OTP signup, JWT auth, cookie sessions and role-based access control in server-side middleware, with Razorpay for payments.",
    tags: ["React", "Node.js", "MongoDB", "JWT", "Razorpay"],
    repo: "https://github.com/VSathveek/BrainWave",
  },
  {
    title: "Smart Environment Dashboard",
    description:
      "Real-time monitoring of environmental sensor streams, with interactive trend dashboards, threshold alerting and device-management workflows.",
    tags: ["TypeScript", "React", "Node.js", "REST APIs"],
    repo: "https://github.com/VSathveek/smart_environment_system",
  },
];
