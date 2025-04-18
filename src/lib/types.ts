export interface ResearchRequest {
  topic: string;
  additionalContext?: string;
}

export interface ResearchResponse {
  researchId: string;
  status: string;
  estimatedTime: string;
}

export interface ResearchReport {
  id: string;
  topic: string;
  summary: string;
  sections: {
    title: string;
    content: string;
  }[];
  sources: {
    title: string;
    url: string;
    description?: string;
  }[];
  createdAt: string;
}

export interface ResearchHistory {
  id: string;
  userId: string;
  topic: string;
  createdAt: string;
}
