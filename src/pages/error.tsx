import { Link } from "@tanstack/react-router";
import { Plane } from "lucide-react";

import { Separator } from "@/components/ui/separator";

export default function Error() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="inline-flex items-center gap-2">
        <span className="text-destructive text-xl md:text-3xl font-bold">
          Error
        </span>
        <Separator orientation="vertical" className="bg-sky-500" />
        <span className="text-base md:text-xl font-semibold text-center">
          Oops! Something went wrong.
        </span>
      </h1>
      <p className="text-center">
        We apologize for the inconvenience. Please try again later.
      </p>
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
