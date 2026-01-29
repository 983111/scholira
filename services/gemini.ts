import { SearchParams, SearchResult } from "../types";

export const findScholarships = async (params: SearchParams): Promise<SearchResult> => {
  const WORKER_URL = "https://scholara-api.vishwajeetadkine705.workers.dev";

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching scholarships:", error);
    throw error;
  }
};
