import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeaderTitle from "./components/HeaderTitle";
import RefreshButton from "./components/RefreshButton";

// Example route components
import HomePage from "./pages/HomePage";
import ContactUs from "./pages/ContactUs";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Fixed header */}
        <Header />

        {/* Website Title */}
        <HeaderTitle />

        {/* Page-specific content */}
        <div className="page-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>

          <Routes>
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </div>

        {/* Sticky refresh button */}
        <RefreshButton />
      </div>
    </Router>
  );
};

export default App;
