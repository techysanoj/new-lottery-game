// backend-server/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Game from "./models/game.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "https://techysanoj.github.io" }));
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => console.log("✅ MongoDB connected"));
mongoose.connection.on("error", (err) => console.error("❌ MongoDB error:", err));

// ✅ POST: Save manual data
app.post("/api/save-manual", async (req, res) => {
  try {
    const { gameName, yesterday, today, createdAt } = req.body;
    if (!gameName) {
      return res.status(400).json({ success: false, error: "gameName is required" });
    }

    const newGame = new Game({ gameName, yesterday, today, createdAt });
    await newGame.save();

    res.json({ success: true, message: "Data saved to MongoDB!", data: newGame });
  } catch (err) {
    console.error("Error saving:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ GET: Fetch latest 50 entries
app.get("/api/own_data", async (req, res) => {
  try {
    const results = await Game.find().sort({ _id: -1 }).limit(50);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from DB" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Backend running at http://localhost:${port}`));
