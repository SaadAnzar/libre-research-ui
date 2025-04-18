import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2Icon, MinusIcon, PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useResearch } from "@/services/research-service";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

const researchTips = [
  {
    title: "Academic Topics",
    subtitle: "The impact of climate change on ocean ecosystems",
  },
  {
    title: "Historical Events",
    subtitle: "The economic consequences of the Industrial Revolution",
  },
  {
    title: "Technology Trends",
    subtitle: "The evolution and future of artificial intelligence",
  },
  {
    title: "Health & Medicine",
    subtitle: "Advances in cancer treatment over the last decade",
  },
];

export default function ResearchIndex() {
  const navigate = useNavigate();
  const { requestResearch } = useResearch();

  const [researchTopic, setResearchTopic] = useState<string>("");
  const [additionalContext, setAdditionalContext] = useState<string>("");
  const [showTextarea, setShowTextarea] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!researchTopic) return;

    try {
      setLoading(true);
      const response = await requestResearch.mutateAsync({
        topic: researchTopic,
        ...(additionalContext && { additional_context: additionalContext }),
      });

      navigate({
        to: `/research/${response.research_id}`,
      });
    } catch (error: any) {
      toast.error(error?.detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 md:px-8">
      <div className="flex flex-col items-center text-center gap-6 py-6 md:py-12">
        <h1 className="text-3xl md:text-4xl font-semibold">
          <span className="gradient-text">Libre Research</span>
        </h1>
        <p className="text-lg max-w-lg text-muted-foreground">
          Enter your research topic and our AI will generate a comprehensive,
          academic-quality report with sources.
        </p>
      </div>
      <div className="pt-8 pb-4 flex gap-4 items-center justify-between">
        <div className="relative w-full">
          <Input
            id="research-topic"
            name="research-topic"
            type="text"
            className="w-full h-14 rounded-xl md:text-lg pr-12"
            placeholder="Enter your research topic"
            value={researchTopic}
            onChange={(event) => setResearchTopic(event.target.value)}
            onKeyDown={(event) => {
              if (showTextarea) return;
              if (
                event.key === "Enter" ||
                (event.metaKey && event.key === "Enter")
              ) {
                handleSubmit();
              }
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={!researchTopic || showTextarea}
            className="cursor-pointer disabled:cursor-default absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 bg-sky-600/30 text-sky-600 hover:bg-sky-600/10 disabled:bg-muted disabled:text-muted-foreground"
          >
            {!showTextarea ? (
              <>
                {loading ? (
                  <Loader2Icon className="animate-spin size-4.5" />
                ) : (
                  <SearchIcon className="size-4.5" />
                )}
              </>
            ) : (
              <SearchIcon className="size-4.5" />
            )}
          </button>
        </div>
        <Button
          className="size-14 rounded-xl"
          variant="outline"
          disabled={loading}
          onClick={() => {
            setAdditionalContext("");
            setShowTextarea(!showTextarea);
          }}
        >
          {showTextarea ? (
            <MinusIcon className="size-6" />
          ) : (
            <PlusIcon className="size-6" />
          )}
        </Button>
      </div>
      {showTextarea && (
        <div className="pb-4 flex flex-col gap-4 transform transition-all">
          <Textarea
            id="research-additional-context"
            name="research-additional-context"
            className="md:text-lg h-28 rounded-xl"
            placeholder="Enter additional context here"
            value={additionalContext}
            onChange={(event) => setAdditionalContext(event.target.value)}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!researchTopic || loading}
              className="h-12 text-base md:text-lg"
            >
              {loading ? (
                <>
                  <Loader2Icon className="animate-spin size-4.5 mr-1" />
                  Generating Report
                </>
              ) : (
                "Generate Report"
              )}
            </Button>
          </div>
        </div>
      )}

      <div className="py-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl text-sky-500">
              What can you research?
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {researchTips.map((tip, index) => (
              <Card key={index} className="bg-accent">
                <CardContent className="space-y-2">
                  <h3>{tip.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    "{tip.subtitle}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
