/**
 * Upstream open-source contributions.
 *
 * These are the strongest credential on the site: merged code in the two
 * document-parsing libraries that a large share of production RAG stacks are
 * built on. Keep this list short and verifiable. Every entry links to a real
 * PR, and `status` must match what GitHub actually says.
 */
export type Contribution = {
  /** Repo in `owner/name` form. */
  repo: string;
  /** Who is behind the project, for readers who don't recognise the repo. */
  org: string;
  /** What the project is, in one line. */
  what: string;
  pr: number;
  title: string;
  /** Plain-language description of the bug and why it mattered. */
  impact: string;
  status: "merged" | "open";
  /** Release the fix shipped in, when known. */
  shippedIn?: string;
  url: string;
};

export const contributions: Contribution[] = [
  {
    repo: "docling-project/docling",
    org: "IBM",
    what: "Document conversion toolkit for generative AI pipelines",
    pr: 4052,
    title: "fix(pdf): preserve a line-final hyphen that does not split a word",
    impact:
      "The PDF text layer joined hyphenated line breaks unconditionally, so a genuine hyphen at the end of a line was swallowed. In technical documents that silently rewrote CLI flags and identifiers: '--verbose' came out as 'verbose'. The corruption then survived all the way into downstream retrieval.",
    status: "merged",
    shippedIn: "v2.122.0",
    url: "https://github.com/docling-project/docling/pull/4052",
  },
  {
    repo: "Unstructured-IO/unstructured",
    org: "Unstructured",
    what: "Open-source ETL for turning complex documents into LLM-ready data",
    pr: 4470,
    title: "fix: ignore processing instructions in HTML partitioning",
    impact:
      "XML processing instructions in HTML input were being treated as document text, injecting markup noise into partitioned elements and polluting the chunks that reach an embedding model.",
    status: "merged",
    url: "https://github.com/Unstructured-IO/unstructured/pull/4470",
  },
  {
    repo: "docling-project/docling",
    org: "IBM",
    what: "Document conversion toolkit for generative AI pipelines",
    pr: 4180,
    title: "fix(reading-order): keep a detached hyphen when merging elements",
    impact:
      "The same class of bug one layer up: merging adjacent layout elements during reading-order assembly dropped a standalone hyphen between them.",
    status: "open",
    url: "https://github.com/docling-project/docling/pull/4180",
  },
];

/** Headline numbers for the hero strip. Derived, so they can't drift. */
export const ossStats = {
  merged: contributions.filter((c) => c.status === "merged").length,
  repos: new Set(contributions.map((c) => c.repo)).size,
};
