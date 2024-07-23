import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ current, max }) => {
  const percentage = max > 0 ? (current / max) * 100 : 0;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${percentage}%` }}>
        {percentage.toFixed(2)}%
      </div>
    </div>
  );
};

export default ProgressBar;
