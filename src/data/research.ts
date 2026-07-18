/**
 * Working papers / manuscripts. Structured like an academic publications list
 * (authors, venue, year, links) so real papers can be added as they land.
 * Only genuine entries — the interpretability work is in preparation.
 */
export type Paper = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  status?: "In preparation" | "Under review" | "Published";
  description?: string;
  links?: { label: string; href: string }[];
};

export const papers: Paper[] = [
  {
    title: "Mechanistic Interpretability of Transformer Language Models",
    authors: "V. Sathveek",
    venue: "Independent research",
    year: "2025",
    status: "In preparation",
    description:
      "Interpretability experiments on GPT-2 Small — activation caching, attention-pattern analysis, residual-stream decomposition, and induction-head detection — using activation patching as a causal intervention to identify which attention heads drive specific predictions.",
    // TODO(me): add the code/GitHub link (and preprint link once posted).
    links: [],
  },
];
