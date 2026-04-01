import axios from "axios";
import Record from "../models/Record.js";

export const analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || !symptoms.trim()) {
      return res.status(400).json({ error: "Symptoms are required" });
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "openai/gpt-oss-120b",
        messages: [
          {
            role: "system",
            content:
              "You are a medical assistant. Always respond strictly in valid JSON format without any extra text."
          },
          {
            role: "user",
            content: `User symptoms: ${symptoms}
            Return JSON:
            {
              "conditions": ["condition1", "condition2"],
              "severity": "Low | Medium | High",
              "recommendations": ["step1", "step2"],
              "doctorAdvice": "text",
              "disclaimer": "This is not medical advice. Please consult a qualified healthcare professional."
            }`
          }
        ],
        temperature: 0.3
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const text = response.data.choices[0].message.content;

    let parsed;
    try {
      const clean = text.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(clean);
    } catch {
      return res.status(500).json({ error: "Invalid JSON from LLM" });
    }

    const saved = await Record.create({ symptoms, result: parsed });

    res.json({ result: saved.result });
  } catch (err) {
    console.log("STATUS:", err.response?.status);
    console.log("DATA:", err.response?.data);
    console.log("MESSAGE:", err.message);

    res.status(500).json({ error: "Server Error" });
  }
};

export const getHistory = async (req, res) => {
  try {
    const data = await Record.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("getHistory error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
};