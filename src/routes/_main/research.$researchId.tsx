import Research from "@/pages/research";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/research/$researchId")({
  component: ResearchPage,
});

function ResearchPage() {
  const { researchId } = Route.useParams();
  return <Research researchId={researchId} />;
}
