// services/courses.ts
import { CourseSearchParams, CourseSearchResult } from "../types";

export const findCourses = async (params: CourseSearchParams): Promise<CourseSearchResult> => {
  // Corrected Worker URL as per your requirement
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
      throw new Error(`Failed to fetch courses. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching courses:", error);
    throw new Error(error.message || "Network error. Please try again.");
  }
};
