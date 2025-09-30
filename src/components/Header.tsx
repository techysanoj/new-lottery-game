// components/Header.tsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

interface NavItem {
  label: string;
  path: string;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { label: "HOME", path: "/" },
    { label: "CHART", path: "/chart" },
    { label: "CONTACT", path: "/contact-us" },
    { label: "LOGIN", path: "/login" },
  ];

  const getActiveItem = (): string => {
    const current = navItems.find(item => item.path === location.pathname);
    return current ? current.label : "HOME";
  };

  const [active, setActive] = useState<string>(getActiveItem());

  const handleNavClick = (label: string, path: string) => {
    setActive(label);
    navigate(path);
  };

  return (
    <div className="header-container">
      {/* Navbar */}
      <nav className="navbar">
        {navItems.map(item => (
          <button
            key={item.label}
            className={`nav-btn ${active === item.label ? "active" : ""}`}
            onClick={() => handleNavClick(item.label, item.path)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Scrolling text */}
      <div className="marquee-container">
        <p className="marquee-text">
          Daily Superfast Satta Kendra Result of July 2021 And Leak Numbers for
          Gali, Desawar, Ghaziabad and Faridabad With Confidence
        </p>
      </div>
    </div>
  );
};

export default Header;
