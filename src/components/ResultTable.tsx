// components/ResultTable.tsx
import React from "react";
import "./ResultTable.css";

interface RowData {
  city: string;
  time: string;
  yesterday: string;
  today: string;
}

interface ResultTableProps {
  rows: RowData[];
}

const ResultTable: React.FC<ResultTableProps> = ({ rows }) => {
  return (
    <div className="result-table">
      <table>
        <thead>
          <tr>
            <th>सट्टा का नाम</th>
            <th>कल आया था</th>
            <th>आज का रिजल्ट</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {/* First column with orange background */}
              <td className="city-col">
                <div className="city-name">{row.city}</div>
                <div className="city-time">{row.time}</div>
              </td>

              {/* Second column white background */}
              <td className="yesterday-col">{row.yesterday}</td>

              {/* Third column white background */}
              <td className="today-col">
                {row.today === "WAIT" ? (
                  <span className="wait-badge">WAIT</span>
                ) : (
                  row.today
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
