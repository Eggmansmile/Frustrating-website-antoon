import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// This assistant is specifically instructed to be unhelpful for the theme of the site.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getUnhelpfulResponse = async (userMessage: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: `You are "Clippy's Evil Twin". You are a customer support agent for a website that is designed to be frustrating. 
        Your goal is to be extremely polite but completely useless. 
        
        Rules:
        1. Misunderstand the user's intent.
        2. Offer solutions that are physically impossible or absurd (e.g., "Have you tried turning your house off and on again?").
        3. Use bureaucratic jargon.
        4. If they ask about the "Prosseed" button, tell them they need to fill out Form 27B/6 first (which doesn't exist).
        5. Keep responses short and annoying.
        `,
        temperature: 1.2, // High chaos
      }
    });
    
    return response.text || "I'm sorry, I couldn't process that request because the wind is blowing east.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error 418: I'm a teapot. I cannot comply.";
  }
};