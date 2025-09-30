import React from "react";
import "./ResultCard.css";

const ResultCard: React.FC<{ title: string; number: string | number }> = ({
  title,
  number,
}) => {
  return (
    <section className="result-card container">
      <div className="result-inner">
        <div className="result-title">{title}</div>
        <div className="result-number">{number}</div>
      </div>
    </section>
  );
};

export default ResultCard;
