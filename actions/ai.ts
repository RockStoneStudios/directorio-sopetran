"use server";

import { GoogleGenAI } from "@google/genai";
import { BusinessState } from "@/utils/types/business";


const apiKey = process.env.GEMEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

export const aiGenerateBusinessDescription = async (
  business: BusinessState
): Promise<string> => {
  try {
    const prompt = `Generate 200 words of SEO content in HTML format (with
      h2, h3, ul, li, not including <doctype html> etc) not markdown,
      for this business: ${JSON.stringify(business)}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // modelo más nuevo
      contents: prompt,
    });

    return response.text ?? "";
  } catch (error) {
    console.error("Error generating business description:", error);
    throw new Error("Failed to generate description");
  }
};
