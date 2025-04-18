import { Link } from "@tanstack/react-router";
import { Plane } from "lucide-react";

import { Separator } from "@/components/ui/separator";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <h1 className="inline-flex items-center gap-2">
        <span className="text-destructive text-3xl font-bold">404</span>
        <Separator orientation="vertical" className="bg-sky-500" />
        <span className="text-xl font-semibold">
          This page could not be found.
        </span>
      </h1>
      <Link
        to="/home"
        className="group inline-flex items-center gap-2 text-lg font-medium text-sky-500 hover:underline"
      >
        Return Home
        <Plane className="size-5  group-hover:animate-bounce group-hover:fill-sky-400" />
      </Link>
    </div>
  );
}
