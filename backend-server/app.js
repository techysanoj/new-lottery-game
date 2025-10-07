// backend-server/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Game from "./models/game.js";

import fetch from "node-fetch";
import * as cheerio from "cheerio";


dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));

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


app.get("/api/lottery", async (req, res) => {
  try {
    const response = await fetch("https://lucky-satta.com/", {
      headers: {
        "accept": "text/html,application/xhtml+xml",
        "user-agent": "Mozilla/5.0"
      }
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const tables = {}; // store all table sections

    // loop over possible tablebox sections (1, 2, 3)
    ["tablebox1", "tablebox2", "tablebox3"].forEach((id) => {
      const rows = [];

      $(`section.${id} table tbody tr`).each((i, row) => {
        const cityName = $(row)
          .find("td")
          .eq(0)
          .find("a.gamenameeach")
          .text()
          .trim();

        const time = $(row)
          .find("td")
          .eq(0)
          .contents()
          .filter(function () {
            return (
              this.type === "text" &&
              $(this).text().trim().match(/\d{1,2}:\d{2}\s*(AM|PM)/i)
            );
          })
          .text()
          .trim();

        const yesterday = $(row).find("td").eq(1).text().trim();
        const today = $(row).find("td").eq(2).text().trim();

        if (cityName) {
          rows.push({
            city: cityName,
            time,
            yesterday,
            today,
          });
        }
      });

      if (rows.length > 0) {
        tables[id] = rows;
      }
    });

    res.json(tables);
  } catch (err) {
    console.error("Error fetching lottery data:", err);
    res.status(500).json({ error: "Failed to scrape lottery data" });
  }
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Backend running at http://localhost:${port}`));
