import { Loader } from "@/components/loaders";
import { DeleteButton } from "@/components/research/delete-button";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useResearch } from "@/services/research-service";
import { Link } from "@tanstack/react-router";
import { ClockIcon, FileTextIcon, SearchIcon } from "lucide-react";

export default function History() {
  const { useResearchHistory } = useResearch();

  const { data: researchHistory, isPending } = useResearchHistory(true);

  return (
    <div className="max-w-4xl mx-auto px-2 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-6 md:py-12">
        <div>
          <h1 className="text-2xl font-semibold">Research History</h1>
          <p className="text-muted-foreground">
            Track and access your past research
          </p>
        </div>
        <div>
          <Link
            to="/research"
            className={cn(
              buttonVariants(),
              "bg-sky-600 hover:bg-sky-500 rounded-xl"
            )}
          >
            <SearchIcon className="size-4" />
            New Research
          </Link>
        </div>
      </div>
      <div className="py-2 flex flex-col gap-6">
        {isPending ? (
          <div className="size-full flex items-center justify-center py-8">
            <Loader className="size-8" />
          </div>
        ) : (
          <>
            {researchHistory && researchHistory?.researches?.length !== 0 ? (
              <>
                {researchHistory.researches.map((research) => (
                  <Card className="w-full" key={research.id}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 px-6">
                      <div>
                        <CardTitle className="text-lg">
                          {research.topic}
                        </CardTitle>
                        <p className="text-muted-foreground text-xs inline-flex items-center gap-1">
                          <ClockIcon className="size-3" />
                          {new Date(
                            research.created_at
                          ).toLocaleDateString()}{" "}
                          at{" "}
                          {new Date(research.created_at).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 justify-between">
                        <DeleteButton researchId={research.id} />

                        <Link
                          to="/research/$researchId"
                          params={{
                            researchId: research.id,
                          }}
                          className={cn(
                            buttonVariants({ variant: "secondary" }),
                            "rounded-xl"
                          )}
                        >
                          View Report <FileTextIcon />
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            ) : (
              <h1 className="text-muted-foreground text-center text-lg py-8">
                No research history found
              </h1>
            )}
          </>
        )}
      </div>
    </div>
  );
}
