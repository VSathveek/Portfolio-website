import type { Block } from "@/types/post";

/**
 * Renders a post's blocks for public reading. Text blocks inject their stored
 * HTML (authored by the owner, so trusted); drawing blocks inject the exported
 * SVG, constrained to be responsive.
 */
export function PostContent({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block) =>
        block.type === "text" ? (
          <div
            key={block.id}
            className="prose prose-neutral dark:prose-invert prose-headings:font-serif prose-headings:font-medium prose-a:text-accent max-w-none"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        ) : (
          <figure
            key={block.id}
            className="border-border overflow-x-auto rounded-lg border bg-white p-3 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
            dangerouslySetInnerHTML={{ __html: block.svg }}
          />
        )
      )}
    </div>
  );
}
