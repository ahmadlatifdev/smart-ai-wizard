import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // Or "gpt-3.5-turbo" if that’s your tier
      messages: [
        { role: "system", content: "You are Smart AI Wizard. Be helpful and creative." },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content.trim();
    res.status(200).json({ response: reply });
  } catch (error) {
    console.error("OpenAI error:", error.message);
    res.status(500).json({ error: "AI failed to respond" });
  }
}
