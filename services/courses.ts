import { CourseSearchParams, CourseSearchResult } from "../types";

export const findCourses = async (params: CourseSearchParams): Promise<CourseSearchResult> => {
  // Corrected API URL as requested
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
      throw new Error(`Failed to fetch courses. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching courses:", error);
    throw new Error(error.message || "Network error. Please try again.");
  }
};
