import { GoogleGenAI, Type } from "@google/genai";

// Safely access process.env to avoid 'process is not defined' errors in browser
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';

const ai = new GoogleGenAI({ apiKey });

export const getScholarshipRecommendations = async (
  profile: { level: string; field: string; location: string }
): Promise<any[]> => {
  if (!apiKey) {
    // Return mock data if no API key is present (fallback for demo purposes)
    return [
      {
        name: "El-Yurt Umidi Foundation",
        deadline: "2024-08-15",
        amount: "Full Tuition + Stipend",
        matchReason: "Matches your profile for Uzbekistan national merit."
      },
      {
        name: "Central Asia Grad Grant",
        deadline: "2024-09-01",
        amount: "$5,000 / year",
        matchReason: "Specific to STEM students in the region."
      },
      {
        name: "Digital Future Scholarship",
        deadline: "2024-10-20",
        amount: "$2,500",
        matchReason: "Targeted at technology and innovation fields."
      }
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert scholarship advisor for students in Uzbekistan and Central Asia. 
      Generate 3 realistic (or real if known) scholarship opportunities for a student with this profile:
      Level: ${profile.level}
      Field of Study: ${profile.field}
      Location/Origin: ${profile.location}.
      
      Return the data strictly in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              deadline: { type: Type.STRING },
              amount: { type: Type.STRING },
              matchReason: { type: Type.STRING }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("Error fetching AI recommendations:", error);
    return [];
  }
};