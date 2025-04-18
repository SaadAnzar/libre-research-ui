import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, LoaderIcon, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useResearch } from "@/services/research-service";
import { toast } from "sonner";

const walkthroughTips = [
  {
    step: 1,
    title: "Enter Your Topic",
    subtitle: "Provide a research topic you want to explore in depth.",
  },
  {
    step: 2,
    title: "AI Research",
    subtitle:
      "Our advanced AI conducts comprehensive research using Google Gemini.",
  },
  {
    step: 3,
    title: "Review Report",
    subtitle: "Receive a structured report with citations and sources.",
  },
  {
    step: 4,
    title: "Download & Share",
    subtitle: "Download your report as a PDF for easy sharing and reference.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { requestResearch } = useResearch();

  const [researchTopic, setResearchTopic] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!researchTopic) return;

    try {
      setLoading(true);
      const response = await requestResearch.mutateAsync({
        topic: researchTopic,
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
          Welcome to <span className="gradient-text">Libre Research</span>,
          <br />
          {"researcher@gmail.com".split("@")[0]}!
        </h1>
        <p className="text-lg max-w-lg text-muted-foreground">
          Your AI-powered research assistant. Get comprehensive reports on any
          topic with just a few clicks.
        </p>
      </div>
      <div className="py-8">
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
            disabled={!researchTopic || loading}
            className="cursor-pointer disabled:cursor-default absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 bg-sky-600/30 text-sky-600 hover:bg-sky-600/10 disabled:bg-muted disabled:text-muted-foreground"
          >
            {loading ? (
              <LoaderIcon className="animate-spin size-4.5" />
            ) : (
              <SearchIcon className="size-4.5" />
            )}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
        <Card className="w-full">
          <CardHeader className="inline-flex items-center gap-4">
            <SearchIcon className="size-8 text-sky-600 bg-sky-500/10 rounded-full p-2" />
            <CardTitle className="text-xl">Start New Research</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Enter any topic and our AI will generate a comprehensive research
            report with sources.
          </CardContent>
          <CardFooter>
            <Link
              to="/research"
              className={cn(
                buttonVariants(),
                "rounded-xl bg-sky-500 hover:bg-sky-600"
              )}
            >
              Start Researching <ArrowRightIcon className="size-5" />
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader className="inline-flex items-center gap-4">
            <SearchIcon className="size-8 text-sky-600 bg-sky-500/10 rounded-full p-2" />
            <CardTitle className="text-xl">View Research History</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Access your past research reports and continue where you left off.
          </CardContent>
          <CardFooter>
            <Link
              to="/history"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "rounded-xl"
              )}
            >
              View History <ArrowRightIcon className="size-5" />
            </Link>
          </CardFooter>
        </Card>
      </div>
      <div className="py-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">How it works</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {walkthroughTips.map((tip) => (
                <li key={tip.step} className="flex items-start">
                  <div className="bg-accent text-sky-600 size-10 rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">
                    {tip.step}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">{tip.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {tip.subtitle}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
