import { GoogleGenAI } from "@google/genai";
import { SearchParams, SearchResult, Scholarship } from "../types";

// Helper to extract JSON from markdown code blocks if present
const extractJson = (text: string): any => {
  try {
    // Try parsing directly first
    return JSON.parse(text);
  } catch (e) {
    // Look for markdown code blocks
    const match = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1]);
      } catch (err) {
        console.error("Failed to parse JSON from markdown block", err);
      }
    }
    // Try to find array brackets
    const arrayMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (arrayMatch) {
      try {
        return JSON.parse(arrayMatch[0]);
      } catch (err) {
        console.error("Failed to parse JSON array from text", err);
      }
    }
    return null;
  }
};

export const findScholarships = async (params: SearchParams): Promise<SearchResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Build academic profile string for the prompt
  const scores = [];
  if (params.gpa) scores.push(`GPA: ${params.gpa}`);
  if (params.sat) scores.push(`SAT: ${params.sat}`);
  if (params.ielts) scores.push(`IELTS: ${params.ielts}`);
  if (params.toefl) scores.push(`TOEFL: ${params.toefl}`);
  const academicProfile = scores.length > 0 ? `Student Scores: ${scores.join(', ')}` : "Scores not specified (assume high merit).";

  // Prompt engineered for high quantity and specific need-based inclusion
  const prompt = `
    Act as a master college counselor. 
    Create a COMPREHENSIVE and EXTENSIVE list (aim for 20-30 items) of active scholarships and university financial aid opportunities for this student:
    
    PROFILE:
    - Citizenship: ${params.originCountry}
    - Field: ${params.fieldOfStudy}
    - Level: ${params.studyLevel}
    - Destination: ${params.targetRegion}
    - ${academicProfile}

    MANDATORY OUTPUT RULES:
    1. STRICTLY JSON ARRAY format. No conversational filler.
    2. QUANTITY: Provide a large list. Do not stop at 10. List as many relevant opportunities as possible (20+).
    3. CONTENT MIX:
       - 50% Merit-based Scholarships (Government & Foundation).
       - 50% Universities with GENEROUS NEED-BASED AID for International Students (especially if destination is USA/West). Treat these as scholarship entries (e.g., Name: "Need-based Financial Aid", Provider: "Harvard University").
    4. SCORE FILTERING: Use the provided GPA/SAT/IELTS scores. Only recommend schools/grants where the student is competitive.
    5. DATA FIELDS:
       - name (string)
       - provider (string)
       - amount (string): Be specific (e.g. "Full Tuition + Stipend", "100% Demonstrated Need")
       - deadline (string): Next upcoming deadline
       - description (string): Short, punchy summary (max 20 words)
       - eligibility (array of strings): max 3 key requirements (e.g. "SAT 1450+", "CSS Profile")
       - location (string)

    Prioritize FULLY FUNDED opportunities.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 0 }, // Optimized for speed despite large list
      },
    });

    const textResponse = response.text || "";
    
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources: { title: string; uri: string }[] = [];
    
    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || "Source",
            uri: chunk.web.uri,
          });
        }
      });
    }

    const parsedData = extractJson(textResponse);
    let scholarships: Scholarship[] = [];

    if (Array.isArray(parsedData)) {
      scholarships = parsedData;
    } else if (parsedData && parsedData.scholarships && Array.isArray(parsedData.scholarships)) {
        scholarships = parsedData.scholarships;
    }

    return {
      scholarships,
      rawText: scholarships.length === 0 ? textResponse : undefined,
      sources,
    };

  } catch (error) {
    console.error("Error fetching scholarships:", error);
    throw error;
  }
};
