// pages/HomePage.jsx
import "./HomePage.css";
import { useEffect, useState } from "react";

// Import components
import DateTimeDisplay from "../components/DateTimeDisplay";
import CityResult from "../components/CityResult";
import FooterResult from "../components/FooterResult";
import WhatsAppSection from "../components/WhatsAppSection";
import TelegramSection from "../components/TelegramSection";
import DealerSection from "../components/DealerSection";
import ResultTable from "../components/ResultTable";
import DealerContact from "../components/DealerContact";
import MonthlyResultChart from "../components/MonthlyResultChart";
import Footer from "../components/Footer";
import SattaInfo from "../components/SattaInfor";

const HomePage = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [primary, setPrimary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://a1-satta.com/_next/data/7FVxvYUZxYM7gu3HioaPS/index.json",
          {
            headers: {
              "x-nextjs-data": "1",
              accept: "*/*",
            },
          }
        );
        const json = await res.json();

        setUpcoming(json.pageProps.upcoming || []);
        setPrimary(json.pageProps.primary || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);
  const rows = [
    { city: "SADAR BAZAR", time: "01:40 PM", yesterday: "06", today: "WAIT" },
    { city: "GWALIOR", time: "02:40 PM", yesterday: "15", today: "WAIT" },
    { city: "DELHI BAZAR", time: "03:10 PM", yesterday: "28", today: "WAIT" },
    { city: "DELHI MATKA", time: "03:40 PM", yesterday: "87", today: "WAIT" },
    { city: "SHRI GANESH", time: "04:40 PM", yesterday: "34", today: "WAIT" },
    { city: "AGRA", time: "05:30 PM", yesterday: "91", today: "WAIT" },
    { city: "FARIDABAD", time: "06:10 PM", yesterday: "57", today: "WAIT" },
    { city: "ALWAR", time: "07:30 PM", yesterday: "91", today: "WAIT" },
    { city: "GAZIYABAD", time: "09:30 PM", yesterday: "10", today: "WAIT" },
    { city: "DWARKA", time: "10:20 PM", yesterday: "39", today: "WAIT" },
    { city: "GALI", time: "11:40 PM", yesterday: "95", today: "WAIT" },
  ];

  const columns = [
    "Date",
    "SADAR BAZAR",
    "GWALIOR",
    "DELHI BAZAR",
    "DELHI MATKA",
    "SHRI GANESH",
    "AGRA",
    "FARIDABAD",
    "ALWAR",
    "GAZIYABAD",
    "DWARKA",
    "GALI",
    "DISAWER"
  ];

  const data = [
    ["01-09", "18", "86", "01", "72", "71", "98", "70", "33", "46", "49", "68", "--"],
    ["02-09", "39", "74", "33", "62", "07", "95", "00", "35", "57", "38", "57", "66"],
    ["02-09", "39", "74", "33", "62", "07", "95", "00", "35", "57", "38", "57", "66"],
    ["02-09", "39", "74", "33", "62", "07", "95", "00", "35", "57", "38", "57", "66"],
    ["02-09", "39", "74", "33", "62", "07", "95", "00", "35", "57", "38", "57", "66"],
    ["02-09", "39", "74", "33", "62", "07", "95", "00", "35", "57", "38", "57", "66"],
    ["02-09", "39", "74", "33", "62", "07", "95", "00", "35", "57", "38", "57", "66"],
    ["02-09", "39", "74", "33", "62", "07", "95", "00", "35", "57", "38", "57", "66"],
    ["02-09", "39", "74", "33", "62", "07", "95", "00", "35", "57", "38", "57", "66"],
    ["03-09", "68", "04", "06", "77", "06", "13", "88", "79", "94", "19", "72", "70"],
    ["03-09", "68", "04", "06", "77", "06", "13", "88", "79", "94", "19", "72", "70"],
    ["03-09", "68", "04", "06", "77", "06", "13", "88", "79", "94", "19", "72", "70"],
    ["04-09", "92", "68", "71", "51", "86", "02", "00", "60", "52", "34", "54", "73"],
    ["04-09", "92", "68", "71", "51", "86", "02", "00", "60", "52", "34", "54", "73"],
    ["04-09", "92", "68", "71", "51", "86", "02", "00", "60", "52", "34", "54", "73"],
    ["04-09", "92", "68", "71", "51", "86", "02", "00", "60", "52", "34", "54", "73"],
    ["04-09", "92", "68", "71", "51", "86", "02", "00", "60", "52", "34", "54", "73"],
    ["01-09", "18", "86", "01", "72", "71", "98", "70", "33", "46", "49", "68", "--"],
    ["01-09", "18", "86", "01", "72", "71", "98", "70", "33", "46", "49", "68", "--"],
    ["01-09", "18", "86", "01", "72", "71", "98", "70", "33", "46", "49", "68", "--"],
    ["04-09", "92", "68", "71", "51", "86", "02", "00", "60", "52", "34", "54", "73"],
    ["04-09", "92", "68", "71", "51", "86", "02", "00", "60", "52", "34", "54", "73"],
    // ... add more rows
  ];
  return (
    <div className="homepage">
      
      {/* Dynamic Date & Time */}
      <DateTimeDisplay />

      {/* City Results from upcoming */}
      <div className="city-results">
        {upcoming.map((game) => (
          <CityResult
            key={game.gameName}
            city={game.gameName.toUpperCase()}
            status={isNaN(game.result) ? "WAIT" : game.result}
          />
        ))}
      </div>

      {/* Footer Result from primary */}
      {primary.map((p) => (
        <FooterResult
          key={p.gameName}
          city={p.gameName.toUpperCase()}
          time={p.createdAt}
          left={p.yesterday}
          right={p.today === -1 ? "WAIT" : p.today}
        />
      ))}

      {/* Social Sections */}
      <div className="social-icons">
        <WhatsAppSection />
        <TelegramSection />
      </div>
      
      {/* Dealer Section */}
      <DealerSection 
        name="VIRAJ BHAI KHAIWAL" 
        whatsappLink="https://wa.me/1234567890" 
      />

      <DealerSection 
        name="RAJU BHAI KHAIWAL" 
        whatsappLink="https://wa.me/9876543210" 
      />

      {/* Result Table */}
      <ResultTable rows={rows} />
      <ResultTable rows={rows} />
      <ResultTable rows={rows} />

      {/* Dealer Contact Info */}
      <DealerContact 
        name="ARUN BHAI" 
        whatsappLink="https://wa.me/1234567890" 
      />

      <MonthlyResultChart
              title="SEPTEMBER 2025 RESULT CHART"
              columns={columns}
              data={data}
            />
      
      
      <SattaInfo/>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
