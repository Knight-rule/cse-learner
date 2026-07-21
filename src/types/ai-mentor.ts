export interface AIMentorPrompt {
  id: string;
  userId?: string;
  question: string;
  context: {
    courseSlug: string;
    problemId?: string;
    problemTitle?: string;
    difficulty?: string;
    language?: string;
    code?: string;
  };
  hintLevel: "none" | "minimal" | "moderate" | "full";
  createdAt: number;
  updatedAt: number;
}

export interface AIMentorResponse {
  id: string;
  promptId: string;
  userId?: string;
  response: string;
  explanation?: string;
  relatedConcepts?: string[];
  difficultyLevel: "easy" | "medium" | "hard";
  codeSnippet?: string;
  createdAt: number;
}

export interface AIMentorStats {
  userId?: string;
  totalPrompts: number;
  totalResponses: number;
  lastInteraction: number;
  averageResponseTime: number;
}