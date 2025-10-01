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

  const [tables, setTables] = useState<{ [key: string]: any[] }>({}); 
  // tables = { table1: [...rows], table2: [...rows], ... }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/lottery"); // proxy endpoint
        const json = await res.json();
  
        // The API now returns { tablebox1: [...], tablebox2: [...], tablebox3: [...] }
        const formattedTables: { [key: string]: any[] } = {};
  
        Object.entries(json).forEach(([tableName, items]) => {
          console.log("tableName, items", tableName, items);
          formattedTables[tableName] = (items as any[]).map((item) => ({
            city: (item.city || "").toUpperCase(),
            time: item.time || "",
            yesterday: item.yesterday && item.yesterday !== "--" ? item.yesterday : "-",
            today: item.today && item.today !== "--" ? item.today : "WAIT",
          }));
        });
        
  
        setTables(formattedTables);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/lottery"); // use proxy!
        const json = await res.json();
  
        setUpcoming(json.pageProps?.upcoming || []);
        setPrimary(json.pageProps?.primary || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
  
    fetchData();
  }, []);


  const [monthTitle, setMonthTitle] = useState("");
  const [monthTables, setMonthTables] = useState([]);

  useEffect(() => {
    const fetchLuckyResults = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/lucky"); // adjust URL if needed
        const json = await res.json();
        console.log('json', json)
        setMonthTitle(json.title || "");
        setMonthTables(json.tables || []);
      } catch (err) {
        console.error("Error fetching lucky results:", err);
      }
    };

    fetchLuckyResults();
  }, []);
  

  // const rows = [
  //   { city: "SADAR BAZAR", time: "01:40 PM", yesterday: "06", today: "WAIT" },
  //   { city: "GWALIOR", time: "02:40 PM", yesterday: "15", today: "WAIT" },
  //   { city: "DELHI BAZAR", time: "03:10 PM", yesterday: "28", today: "WAIT" },
  //   { city: "DELHI MATKA", time: "03:40 PM", yesterday: "87", today: "WAIT" },
  //   { city: "SHRI GANESH", time: "04:40 PM", yesterday: "34", today: "WAIT" },
  //   { city: "AGRA", time: "05:30 PM", yesterday: "91", today: "WAIT" },
  //   { city: "FARIDABAD", time: "06:10 PM", yesterday: "57", today: "WAIT" },
  //   { city: "ALWAR", time: "07:30 PM", yesterday: "91", today: "WAIT" },
  //   { city: "GAZIYABAD", time: "09:30 PM", yesterday: "10", today: "WAIT" },
  //   { city: "DWARKA", time: "10:20 PM", yesterday: "39", today: "WAIT" },
  //   { city: "GALI", time: "11:40 PM", yesterday: "95", today: "WAIT" },
  // ];
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
            status={(game.result === -1)? "WAIT" : game.result}
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

      {/* Render one ResultTable per table dynamically */}
      {Object.entries(tables).map(([tableName, rows]) => (
          <div key={tableName} className="mb-6">
            <ResultTable rows={rows} />
          </div>
        ))}

      {/* Dealer Contact Info */}
      <DealerContact 
        name="ARUN BHAI" 
        whatsappLink="https://wa.me/1234567890" 
      />

      {/* <MonthlyResultChart
              title="SEPTEMBER 2025 RESULT CHART"
              columns={columns}
              data={data}
            /> */}

      {monthTables.map((table, idx) => (
              <div key={idx} className="mb-8">
                <MonthlyResultChart
                  title={monthTitle}
                  columns={table.columns}
                  data={table.data}
                />
              </div>
            ))}
      
      
      <SattaInfo/>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
