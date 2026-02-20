import { SearchParams, SearchResult } from "../types";

export const findScholarships = async (params: SearchParams): Promise<SearchResult> => {
  const WORKER_URL = "https://scholara-backend.vishwajeetadkine705.workers.dev";

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Worker error response:", errorText);
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.error("Error fetching data:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Network error. Please try again.");
  }
};
