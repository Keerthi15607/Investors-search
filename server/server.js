import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  const { sector, country, stage } = req.body;

  const prompt = `
Suggest 3 investors who invest in ${sector} startups in ${country}.
Startup stage: ${stage}.
Give one-line reasoning for each.
`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    res.json({ result: data.choices[0].message.content });

  } catch (err) {
    res.status(500).json({ error: "AI API failed" });
  }
});

app.listen(5000, () => {
  console.log("AI server running on http://localhost:5000");
});
