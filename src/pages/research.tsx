import { Loader2 } from "@/components/loaders";
import { DeleteButton } from "@/components/research/delete-button";
import { ResearchReport } from "@/components/research/research-report";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResearch } from "@/services/research-service";
import { useNavigate } from "@tanstack/react-router";
import { DownloadCloudIcon, XCircleIcon } from "lucide-react";
import { toast } from "sonner";

export default function Research({ researchId }: { researchId: string }) {
  const { useResearchStatus, useResearchReport, downloadPdf } = useResearch();

  const navigate = useNavigate();

  const {
    data: researchStatus,
    isPending: isStatusPending,
    isError: isStatusError,
  } = useResearchStatus(researchId);

  const {
    data: report,
    isPending: isReportPending,
    isError: isReportError,
  } = useResearchReport(researchId, researchStatus?.status === "completed");

  if (isStatusError || isReportError) {
    return (
      <div className="size-full flex items-center justify-center py-8">
        <Card className="max-w-lg w-full">
          <CardHeader className="flex flex-col items-center justify-center gap-2">
            <XCircleIcon className="size-5 text-destructive" />
            <CardTitle className="text-xl text-sky-500">
              Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm text-center space-y-2">
            <p>We're sorry for the inconvenience.</p>
            <p>Please try again later or contact us if the problem persists.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (
    isStatusPending ||
    (researchStatus && researchStatus?.status === "in_progress") ||
    isReportPending
  ) {
    return (
      <div className="size-full flex items-center justify-center py-8">
        <Card className="max-w-lg w-full">
          <CardHeader className="flex flex-col items-center justify-center gap-2">
            <Loader2 />
            <CardTitle className="text-xl text-sky-500">
              Researching...
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm text-center space-y-2">
            <p>Please wait while we generate your report.</p>
            <p>
              We're conducting deep research on your topic. This usually takes
              1-2 minutes.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePdfDownload = () => {
    if (!researchId) return;
    downloadPdf.mutate(
      { researchId, topic: report?.topic },
      {
        onSuccess: () => {
          toast.success("Report PDF downloaded successfully!");
        },
        onError: (error) => {
          toast.error("Error downloading report PDF!");
          console.error(error);
        },
      }
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-2 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-6 md:py-12">
        <div>
          <h1 className="text-2xl font-semibold">{report.topic}</h1>
          <p className="text-muted-foreground">
            Research completed on{" "}
            {new Date(report.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <DeleteButton
            researchId={researchId}
            onClick={() => {
              navigate({
                to: "/history",
              });
            }}
          />
          <Button
            className="bg-sky-600 hover:bg-sky-500 rounded-xl"
            onClick={handlePdfDownload}
            disabled={downloadPdf.isPending}
          >
            <DownloadCloudIcon className="size-4" />
            Download Report
          </Button>
        </div>
      </div>

      <ResearchReport report={report} />
    </div>
  );
}
