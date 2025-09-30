// components/FooterResult.tsx
import React from "react";
import "./FooterResult.css";

interface FooterResultProps {
  city: string;
  time: string;
  left: string | number;
  right: string | number;
}

const FooterResult: React.FC<FooterResultProps> = ({ city, time, left, right }) => {
  return (
    <div className="footer-result">
      <h2>{city}</h2>
      <p className="time">{time}</p>
      <div className="result-box">
        <span className="left">{left}</span>
        <span className="arrow">➡️</span>
        <span className="right">{right}</span>
      </div>
    </div>
  );
};

export default FooterResult;
