import { cn } from "@/lib/utils";
import { Loader2Icon, LoaderIcon } from "lucide-react";

export function Loader({ className }: { className?: string }) {
  return (
    <Loader2Icon
      className={cn("animate-spin size-5 text-sky-500", className)}
    />
  );
}

export function Loader2({ className }: { className?: string }) {
  return (
    <LoaderIcon className={cn("animate-spin size-5 text-sky-500", className)} />
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="size-10" />
    </div>
  );
}
