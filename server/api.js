// server/api.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";


const app = express();
app.use(cors()); // allow frontend access

// app.get("/api/lottery", async (req, res) => {
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
