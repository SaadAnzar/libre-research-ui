import ResearchIndex from "@/pages/research-index";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/research/")({
  component: ResearchIndex,
});
