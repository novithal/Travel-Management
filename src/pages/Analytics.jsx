import React from "react";
import RevenueChart from "../components/Chart";

export default function Analytics() {
  return (
    <div className="page">
      <div className="page-intro">
        <div>
          <span>INSIGHTS</span>
          <h2>Analytics</h2>
          <p>Understand how your travel business is performing.</p>
        </div>
      </div>

      <div className="analytics-grid">
        <RevenueChart />

        <div className="analytics-card">
          <div>
            <span>BOOKING STATUS</span>
            <h3>1,248 bookings</h3>
          </div>

          <div className="donut-wrap">
            <div className="donut">
              <strong>79%</strong>
              <span>confirmed</span>
            </div>
          </div>

          <div className="legend">
            <span>
              <i></i>
              Confirmed <b>984</b>
            </span>

            <span>
              <i></i>
              Pending <b>128</b>
            </span>

            <span>
              <i></i>
              Cancelled <b>136</b>
            </span>
          </div>
        </div>
      </div>

      <div className="analytics-bottom">
        {[
          ["Average booking", "$1,842", "+12.4%"],
          ["Conversion rate", "68.2%", "+5.8%"],
          ["Customer retention", "74.6%", "+8.1%"],
          ["Avg. trip duration", "6.4 days", "+2.2%"],
        ].map(([label, value, change]) => (
          <div className="analytics-stat" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{change}</small>
          </div>
        ))}
      </div>
    </div>
  );
}