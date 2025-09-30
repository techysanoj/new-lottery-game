// components/CityResult.tsx
import React from "react";
import "./CityResult.css";

interface CityResultProps {
  city: string;
  status: string;
}

const CityResult: React.FC<CityResultProps> = ({ city, status }) => {
  return (
    <div className="city-result">
      <h2>{city}</h2>
      <span className="status">{status}</span>
    </div>
  );
};

export default CityResult;
