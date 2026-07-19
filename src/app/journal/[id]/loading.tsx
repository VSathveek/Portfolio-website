import { Spinner } from "@/components/spinner";

export default function Loading() {
  return (
    <div className="text-muted flex h-[calc(100dvh-4rem)] items-center justify-center">
      <Spinner className="size-6" />
    </div>
  );
}
