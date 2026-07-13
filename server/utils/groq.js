import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

let groqInstance = null;

export const getGroqClient = () => {
  if (!groqInstance) {
    // Fixed the typo here from GORQ to GROQ
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new Error("❌ GROQ_API_KEY is missing or empty in your .env file.");
    }

    groqInstance = new Groq({ apiKey });
  }
  return groqInstance;
};
