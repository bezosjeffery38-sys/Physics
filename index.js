import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || true }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, configured: Boolean(process.env.AI_API_KEY), model: process.env.AI_MODEL || "not-configured" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const messages = req.body?.messages;
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 40) {
      return res.status(400).json({ error: "Send between 1 and 40 messages." });
    }
    const safeMessages = messages.map((m) => ({
      role: ["user", "assistant", "system"].includes(m?.role) ? m.role : "user",
      content: String(m?.content ?? "").slice(0, 12000)
    }));
    if (!process.env.AI_API_KEY) {
      return res.status(503).json({
        error: "AI provider is not configured yet. Add AI_API_KEY to your server .env file."
      });
    }

    const base = (process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "");
    const response = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || "gpt-4o-mini",
        messages: safeMessages,
        temperature: 0.7
      })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || "The AI provider request failed." });
    }
    res.json({ reply: data?.choices?.[0]?.message?.content || "The provider returned an empty response." });
  } catch (err) {
    console.error("Chat request failed:", err?.message || err);
    res.status(500).json({ error: "Unexpected server error. Please try again." });
  }
});

const port = Number(process.env.PORT || 8787);
app.listen(port, () => console.log(`AIM AI API listening on http://localhost:${port}`));
