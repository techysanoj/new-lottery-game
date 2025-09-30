// components/MonthlyResultChart.tsx
import React from "react";
import "./MonthlyResultChart.css";

interface MonthlyResultChartProps {
  title: string;
  columns: string[];
  data: (string | number)[][];
}

const MonthlyResultChart: React.FC<MonthlyResultChartProps> = ({ title, columns, data }) => {
  return (
    <div className="monthly-chart">
      {/* Title */}
      <div className="chart-title">{title}</div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={colIndex === 0 ? "date-col" : "value-col"}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyResultChart;
