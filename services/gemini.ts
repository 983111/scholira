// services/gemini.ts
import { SearchParams, SearchResult, CourseSearchParams, CourseSearchResult } from "../types";

// 1. ORIGINAL SCHOLARSHIP RAG API
export const findScholarships = async (params: SearchParams): Promise<SearchResult> => {
  const WORKER_URL = "https://scholara-rag-api.vishwajeetadkine705.workers.dev";

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch scholarships. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Network error. Please try again.");
  }
};

// 2. NEW COURSES API
export const findCourses = async (params: CourseSearchParams): Promise<CourseSearchResult> => {
  const WORKER_URL = "https://scholara-backend.vishwajeetadkine705.workers.dev";

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...params, type: 'courses' }), // Ensure it searches courses
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch courses. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Network error. Please try again.");
  }
};
