import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";

interface ResearchRequest {
  topic: string;
  additional_context?: string;
}

interface ResearchResponse {
  research_id: string;
  status: string;
  estimated_time: number;
}

interface ResearchStatus {
  status: string;
}

export interface ResearchReport {
  id: string;
  topic: string;
  summary: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
  sources: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
  created_at: string;
}

interface ResearchHistoryResponse {
  researches: Array<{
    id: string;
    user_id: number;
    topic: string;
    created_at: string;
  }>;
}

export function useResearch() {
  const queryClient = useQueryClient();
  const researchKeys = {
    researchHistory: ["researchHistory"],
  };

  const requestResearch = useMutation({
    mutationFn: async (data: ResearchRequest): Promise<ResearchResponse> => {
      try {
        const response = await api.post("/research/", data);
        return response.data;
      } catch (error: any) {
        const statusCode = error.response?.status;
        const errorMessage =
          error.response?.data?.detail || "Failed to request research";
        throw { status: statusCode, detail: errorMessage };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: researchKeys.researchHistory });
    },
  });

  const useResearchHistory = (enabled?: boolean) =>
    useQuery<ResearchHistoryResponse>({
      queryKey: researchKeys.researchHistory,
      queryFn: async () => {
        try {
          const response = await api.get("/research/history");
          return response.data;
        } catch (error: any) {
          const statusCode = error.response?.status;
          const errorMessage =
            error.response?.data?.detail || "Failed to get research history";
          throw { status: statusCode, detail: errorMessage };
        }
      },
      enabled: enabled,
      staleTime: 5 * 60 * 1000,
    });

  const useResearchStatus = (researchId: string) =>
    useQuery<ResearchStatus>({
      queryKey: ["researchStatus", researchId],
      queryFn: async () => {
        try {
          const response = await api.get(`/research/${researchId}/status`);
          return response.data;
        } catch (error: any) {
          const statusCode = error.response?.status;
          const errorMessage =
            error.response?.data?.detail || "Failed to get research status";
          throw { status: statusCode, detail: errorMessage };
        }
      },
      enabled: !!researchId,
      retry: 1,
      refetchOnMount: false,
      refetchInterval: (query) => {
        const { data, status, error } = query.state;

        if (status === "error") {
          console.warn("Polling stopped due to error:", error);
          return false;
        }

        const researchStatus = data as ResearchStatus | undefined;

        if (researchStatus?.status === "in_progress") {
          return 3000;
        }

        return false;
      },
    });

  const useResearchReport = (researchId: string, completed?: boolean) =>
    useQuery<ResearchReport>({
      queryKey: ["researchReport", researchId],
      queryFn: async () => {
        try {
          const response = await api.get(`/research/${researchId}`);

          return response.data;
        } catch (error: any) {
          const statusCode = error.response?.status;
          const errorMessage =
            error.response?.data?.detail || "Failed to get research report";
          throw { status: statusCode, detail: errorMessage };
        }
      },
      enabled: !!researchId && completed,
      staleTime: Infinity,
    });

  const downloadPdf = useMutation({
    mutationFn: async ({
      researchId,
      topic,
    }: {
      researchId: string;
      topic?: string;
    }) => {
      try {
        const fileName = `LibreResearch-${
          topic ? topic.replaceAll(" ", "_") : researchId
        }.pdf`;

        // Check if we already have the data in the cache
        const cachedData = queryClient.getQueryData<Blob>([
          "researchPdf",
          researchId,
        ]);

        if (cachedData) {
          return {
            data: cachedData,
            fileName: fileName,
          };
        }

        const response = await api.get(`/research/${researchId}/pdf`, {
          responseType: "blob",
        });

        // Cache the result for future use
        queryClient.setQueryData(["researchPdf", researchId], response.data);

        return {
          data: response.data,
          fileName: fileName,
        };
      } catch (error: any) {
        const statusCode = error.response?.status;
        const errorMessage =
          error.response?.data?.detail || "Failed to get research PDF";
        throw { status: statusCode, detail: errorMessage };
      }
    },
    onSuccess: (result) => {
      downloadBlob(result.data, result.fileName);
    },
  });

  // Helper function to handle blob download
  const downloadBlob = (blob: Blob, fileName: string) => {
    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    // Append to the document, click it, and clean up
    document.body.appendChild(link);
    link.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  return {
    requestResearch,
    useResearchHistory,
    useResearchStatus,
    useResearchReport,
    downloadPdf,
  };
}
