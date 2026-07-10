import { groq } from "../utils/groq.js";

export const testGenerate = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || !prompt.trim()) {
      return res
        .status(400)
        .json({ message: "prompt is required in the request body" });
    }

    console.log("🔵 Sending prompt to Groq:", prompt);

    // Using Llama 3.3 70B, which is one of Groq's best free-tier models
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    console.log("🟢 Groq responded");

    const output = response.choices[0]?.message?.content || "";
    res.status(200).json({ prompt, output });
  } catch (error) {
    console.error("🔴 Groq call failed:", error.message);
    res
      .status(500)
      .json({ message: "AI generation failed", error: error.message });
  }
};
