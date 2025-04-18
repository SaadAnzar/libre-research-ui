import RoutesLayout from "@/components/layout/routes-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main")({
  component: RoutesLayout,
});
