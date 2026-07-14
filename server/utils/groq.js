import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

let groqInstance = null;

export const getGroqClient = () => {
  if (!groqInstance) {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new Error("❌ GROQ_API_KEY is missing or empty. Set GROQ_API_KEY in server/.env or your deployment environment.");
    }

    groqInstance = new Groq({ apiKey });
  }
  return groqInstance;
};
