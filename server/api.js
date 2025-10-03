// server/api.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); 

const app = express();
app.use(cors({
    origin: "https://techysanoj.github.io"
  }));
app.use(express.json()); 


import mongoose from "mongoose";


// ✅ connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI || "your-mongodb-uri-here", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected");
});
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

const GameSchema = new mongoose.Schema({
    gameName: String,
    yesterday: Number,
    today: Number,
    createdAt: String,
  });
  
const Game = mongoose.model("Game", GameSchema);


app.post("/api/save-manual", async (req, res) => {
    try {
      const { gameName, yesterday, today, createdAt } = req.body;
  
      if (!gameName) {
        return res.status(400).json({ success: false, error: "gameName is required" });
      }
  
      const newGame = new Game({
        gameName,
        yesterday,
        today,
        createdAt,
      });
  
      await newGame.save();
  
      res.json({ success: true, message: "Data saved to MongoDB!", data: newGame });
    } catch (err) {
      console.error("Error saving:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });
  

app.get("/api/own_data", async (req, res) => {
    try {
      const results = await Game.find().sort({ _id: -1 }).limit(50); // latest 50 entries
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch from DB" });
    }
});


// app.get("/api/headers", async (req, res) => {
//   try {
//     const response = await fetch(
//       "https://a1-satta.com/_next/data/7FVxvYUZxYM7gu3HioaPS/index.json",
//       {
//         headers: {
//           "accept": "*/*",
//           "user-agent": "Mozilla/5.0"
//         }
//       }
//     );

//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     console.error("Error fetching:", err);
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// });

function parseTimeToHHMM(timeStr) {
    if (!timeStr) return "";
    const m = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!m) return timeStr.trim();
    let hour = parseInt(m[1], 10);
    let min = parseInt(m[2], 10);
    const ampm = m[3].toUpperCase();
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
  
    // Round minutes to nearest 5 (keeps behaviour similar to your previous code)
    const rounded = Math.round(min / 5) * 5;
    if (rounded === 60) {
      hour = (hour + 1) % 24;
      min = 0;
    } else {
      min = rounded;
    }
  
    return `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
  }
  
  app.get("/api/headers", async (req, res) => {
    try {
      const response = await fetch("https://lucky-satta.com/", {
        headers: {
          accept: "text/html,application/xhtml+xml",
          "user-agent": "Mozilla/5.0",
        },
      });
  
      const html = await response.text();
      const $ = cheerio.load(html);
  
      const upcoming = [];
      const primary = [];
  
      // -------- UPCOMING --------
      // handle possible whitespace nodes between .sattaname and .sattaresult
      $(".sattaname").each((i, el) => {
        const gameName = $(el).find("p").text().trim().toLowerCase();
        const resultEl = $(el).nextAll(".sattaresult").first();
        let resultText = resultEl.find("span").first().text().trim();
        if (!resultText) resultText = resultEl.text().trim();
        const resultNum = resultText === "" ? -1 : parseInt(resultText.replace(/\D/g, ""), 10) || -1;
  
        if (gameName) {
          upcoming.push({
            gameName,
            result: resultNum,
          });
        }
      });
  
      // -------- PRIMARY --------
      // -------- PRIMARY --------
$("section.sattadividerr").each((i, el) => {
    // Extract game name with fallbacks
    let gameName =
      $(el).find("a.gamenameeach h3 strong").text().trim() ||
      $(el).find("h3 strong").text().trim() ||
      $(el).find("a.gamenameeach").text().trim();
  
    gameName = (gameName || "").toLowerCase();
  
    const timeText = $(el).find("p").first().text().trim();
    const createdAt = parseTimeToHHMM(timeText);
  
    // Find the strong element that contains the results (not the game name strong)
    const resultStrong = $(el).find("strong").eq(1); // Second strong element
    
    // If there's only one strong (game name), try finding strong with font-size style
    const strong = resultStrong.length > 0 
      ? resultStrong 
      : $(el).find("strong[style*='font-size']").first();
  
    // Extract all text content and clean it
    let strongText = strong.text().trim().replace(/\s+/g, ' ');
    
    // Extract all numbers from the strong text
    const allNumbers = strongText.match(/\d+/g) || [];
    
    // Yesterday is the first number
    const yesterday = allNumbers.length > 0 ? parseInt(allNumbers[0], 10) : -1;
  
    // Check if wait.gif is present
    const hasWait = strong.find("img[src*='wait.gif']").length > 0;
  
    // If wait.gif exists, today = -1, otherwise try to get second number
    let today = -1;
    if (!hasWait) {
      if (allNumbers.length >= 2) {
        today = parseInt(allNumbers[1], 10);
      } else {
        // No second number but no wait.gif either - could mean result not yet updated
        today = 0;
      }
    }
  
    if (gameName) {
      primary.push({
        yesterday,
        gameName,
        createdAt,
        today,
      });
    }
  });
  
      res.json({ upcoming, primary });
    } catch (err) {
      console.error("Error fetching headers data:", err);
      res.status(500).json({ error: "Failed to scrape headers data" });
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
  
      const tables = {}; // <-- change this to an object
  
      // loop over possible tablebox sections (1, 2, 3)
      ["tablebox1", "tablebox2", "tablebox3"].forEach((id) => {
        const rows = [];
  
        $(`section.${id} table tbody tr`).each((i, row) => {
          const cityName = $(row).find("td").eq(0).find("a.gamenameeach").text().trim();
          const time = $(row).find("td").eq(0).contents().filter(function () {
            return this.type === "text" && $(this).text().trim().match(/\d{1,2}:\d{2}\s*(AM|PM)/i);
          }).text().trim();
  
          const yesterday = $(row).find("td").eq(1).text().trim();
          const today = $(row).find("td").eq(2).text().trim();
  
          if (cityName) {
            rows.push({
              city: cityName,
              time,
              yesterday,
              today
            });
          }
        });
  
        if (rows.length > 0) {
          tables[id] = rows; // <-- set the object key
        }
      });
  
      res.json(tables); // <-- return the object
    } catch (err) {
      console.error("Error fetching lottery data:", err);
      res.status(500).json({ error: "Failed to scrape lottery data" });
    }
  });
  



// new route
import * as cheerio from "cheerio";

app.get("/api/lucky", async (req, res) => {
    try {
      const response = await fetch("https://lucky-satta.com/", {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });
  
      const html = await response.text();
      const $ = cheerio.load(html);
  
      // ✅ Get the title (dynamic month + year)
      const title = $("section[class$='resultchart'] h1").text().trim();
  
      const tables = [];
  
      // ✅ Extract each newtable section
      $("section.newtable").each((i, section) => {
        const columns = [];
        const data = [];
  
        // first row => headers
        $(section).find("table tbody tr").first().find("td").each((j, cell) => {
          columns.push($(cell).text().trim());
        });
  
        // rest rows => data
        $(section).find("table tbody tr").slice(1).each((j, row) => {
          const rowData = [];
          $(row).find("td").each((k, cell) => {
            rowData.push($(cell).text().trim());
          });
          if (rowData.length > 0) data.push(rowData);
        });
  
        tables.push({ columns, data });
      });
  
      res.json({ title, tables });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to scrape data" });
    }
  });



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Proxy running at http://localhost:${port}`));
