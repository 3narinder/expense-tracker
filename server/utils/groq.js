import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

if (!process.env.GORQ_API_KEY) {
  console.log("⚠️ WARNING: GORQ_API_KEY is not set.");
}

export const groq = new Groq({
  apiKey: process.env.GORQ_API_KEY,
});
