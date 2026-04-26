import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in the environment.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

export async function generateFlashcards(keyword: string): Promise<{front: string, back: string}[]> {
  const prompt = `Generate 10 advanced English vocabulary words suitable for university level English exams related to the topic: "${keyword}".
Return ONLY a valid JSON array of objects with exactly two properties: "front" (the vocabulary word) and "back" (its definition in English). 
Do not include markdown blocks like \`\`\`json or any other text. Just the raw JSON array.`;

  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    let text = response.text || "[]";
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const result = JSON.parse(text);
    return result;
  } catch (error) {
    console.error("Failed to generate flashcards", error);
    throw new Error("Could not generate flashcards. Please try again.");
  }
}
