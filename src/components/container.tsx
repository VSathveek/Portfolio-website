import { cn } from "@/lib/cn";

type ContainerProps = {
  /**
   * `prose` keeps line length comfortable for reading (~68ch),
   * `default` is the standard page width, `wide` for galleries/grids.
   */
  size?: "prose" | "default" | "wide";
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

const sizes = {
  prose: "max-w-[68ch]",
  default: "max-w-3xl",
  wide: "max-w-5xl",
} as const;

/** Centered, padded content column with a size-appropriate max width. */
export function Container({
  size = "default",
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-6 sm:px-8", sizes[size], className)}>{children}</Tag>
  );
}
