// frontend-server/scrape.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { parseTimeToHHMM } from "./utils/parseTime.js";

const app = express();
app.use(cors({ origin: "*" }));

app.use(express.json());

// ✅ /api/headers
app.get("/api/headers", async (req, res) => {
  try {
    const response = await fetch("https://lucky-satta.com/", {
      headers: { accept: "text/html", "user-agent": "Mozilla/5.0" },
    });

    const html = await response.text();
    const $ = cheerio.load(html);
    const upcoming = [];
    const primary = [];

    $(".sattaname").each((i, el) => {
      const gameName = $(el).find("p").text().trim().toLowerCase();
      const resultEl = $(el).nextAll(".sattaresult").first();
      let resultText = resultEl.find("span").first().text().trim() || resultEl.text().trim();
      const resultNum = resultText === "" ? -1 : parseInt(resultText.replace(/\D/g, ""), 10) || -1;
      if (gameName) upcoming.push({ gameName, result: resultNum });
    });

    $("section.sattadividerr").each((i, el) => {
      let gameName =
        $(el).find("a.gamenameeach h3 strong").text().trim() ||
        $(el).find("h3 strong").text().trim() ||
        $(el).find("a.gamenameeach").text().trim();
      gameName = (gameName || "").toLowerCase();

      const timeText = $(el).find("p").first().text().trim();
      const createdAt = parseTimeToHHMM(timeText);

      const resultStrong = $(el).find("strong").eq(1);
      const strong = resultStrong.length ? resultStrong : $(el).find("strong[style*='font-size']").first();
      const strongText = strong.text().trim().replace(/\s+/g, " ");
      const allNumbers = strongText.match(/\d+/g) || [];
      const yesterday = allNumbers.length > 0 ? parseInt(allNumbers[0], 10) : -1;
      const hasWait = strong.find("img[src*='wait.gif']").length > 0;
      let today = hasWait ? -1 : allNumbers.length >= 2 ? parseInt(allNumbers[1], 10) : 0;

      if (gameName) primary.push({ gameName, yesterday, today, createdAt });
    });

    res.json({ upcoming, primary });
  } catch (err) {
    console.error("Error fetching headers data:", err);
    res.status(500).json({ error: "Failed to scrape headers data" });
  }
});


// ✅ /api/lucky
app.get("/api/lucky", async (req, res) => {
  try {
    const response = await fetch("https://lucky-satta.com/", {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const html = await response.text();
    const $ = cheerio.load(html);
    const title = $("section[class$='resultchart'] h1").text().trim();
    const tables = [];

    $("section.newtable").each((i, section) => {
      const columns = [];
      const data = [];
      $(section)
        .find("table tbody tr")
        .first()
        .find("td")
        .each((_, cell) => columns.push($(cell).text().trim()));
      $(section)
        .find("table tbody tr")
        .slice(1)
        .each((_, row) => {
          const rowData = [];
          $(row)
            .find("td")
            .each((__, cell) => rowData.push($(cell).text().trim()));
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

const port = 6000;
app.listen(port, () => console.log(`🌐 Scraper running at http://localhost:${port}`));
