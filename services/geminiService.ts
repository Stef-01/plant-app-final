
import { GoogleGenAI } from "@google/genai";
import type { Weather, Plant } from "../types";

// IMPORTANT: In a real application, this API key should be stored in a secure environment variable.
// This application is designed to run in a specific environment where `process.env.API_KEY` is available.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API key not found. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function getGardeningTip(weather: Weather, plant: Plant): Promise<string> {
  if (!API_KEY) {
    return "Gemini is taking a nap... (API key not configured)";
  }

  const prompt = `
    You are a cheerful, "vibe-coded" garden assistant for a gardener in Logan, Queensland, Australia (a subtropical climate).
    Based on this specific weather information and plant, give me one short, creative, and encouraging gardening tip.
    Keep it under 30 words. The tone should be relaxed, positive, and a bit quirky, like a friend giving advice.
    Do not use markdown.

    Weather Today:
    - Condition: ${weather.current.condition}
    - Temperature: ${weather.current.tempC}°C
    - Humidity: ${weather.current.humidity}%

    Plant in Focus:
    - Name: ${plant.name}
    - Category: ${plant.category}
    - Current Stage: ${plant.phenology}

    Generate the tip now.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Could not get a tip from the cosmos right now. Try again later!";
  }
}
