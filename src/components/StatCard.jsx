import React from "react";

export default function StatCard({
  icon,
  label,
  value,
  change,
  positive = true,
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">{icon}</div>

        <span className={positive ? "trend up" : "trend down"}>
          {positive ? "↗" : "↘"} {change}
        </span>
      </div>

      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
    </div>
  );
}