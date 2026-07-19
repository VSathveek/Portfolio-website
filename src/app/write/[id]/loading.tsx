import { Spinner } from "@/components/spinner";

export default function Loading() {
  return (
    <div className="text-muted flex min-h-[60vh] items-center justify-center">
      <Spinner className="size-6" />
    </div>
  );
}
