import { SearchParams, SearchResult } from "../types";

export const findScholarships = async (params: SearchParams): Promise<SearchResult> => {
  const WORKER_URL = "https://scholara-rag-api.vishwajeetadkine705.workers.dev";

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
      throw new Error(`Failed to fetch scholarships. Please check your Cloudflare Worker.`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching scholarships:", error);
    if (error.message.includes("API Key")) {
      throw new Error("Backend configuration error. Please check your Cloudflare Worker API key setup.");
    }
    throw new Error(error.message || "Network error. Please try again.");
  }
};
