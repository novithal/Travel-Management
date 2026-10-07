
import React, { useMemo, useState } from "react";

const chartData = {
  12: {
    amount: "$84,290",
    change: "+18.4%",
    values: [35, 48, 42, 62, 58, 75, 68, 88, 82, 96, 91, 108],
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },

  6: {
    amount: "$52,640",
    change: "+12.8%",
    values: [42, 58, 51, 76, 69, 96],
    labels: [
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
};

export default function RevenueChart() {
  const [period, setPeriod] = useState("12");

  const current = chartData[period];

  const points = useMemo(() => {
    const values = current.values;

    const width = 550;
    const startX = 20;
    const endX = 570;

    const max = Math.max(...values);
    const min = Math.min(...values);

    return values
      .map((value, index) => {
        const x =
          startX +
          (index / (values.length - 1)) *
            (endX - startX);

        const y =
          145 -
          ((value - min) / (max - min || 1)) *
            105;

        return `${x},${y}`;
      })
      .join(" ");
  }, [current]);

  return (
    <div className="chart-box">

      <div className="chart-heading">

        <div>
          <span>REVENUE OVERVIEW</span>

          <div className="revenue-main-row">
            <h3>{current.amount}</h3>

            <span className="revenue-change">
              {current.change}
            </span>
          </div>

          <p className="revenue-subtitle">
            Revenue performance
          </p>
        </div>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="12">
            Last 12 months
          </option>

          <option value="6">
            Last 6 months
          </option>
        </select>

      </div>

      <div className="chart-wrapper">

        <div className="chart-grid-lines">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <svg
          className="revenue-chart"
          viewBox="0 0 580 180"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="chartFill"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopOpacity=".25"
              />

              <stop
                offset="100%"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          <polygon
            points={`20,160 ${points} 570,160`}
            fill="url(#chartFill)"
          />

          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {current.values.map((value, index) => {
            const max = Math.max(...current.values);
            const min = Math.min(...current.values);

            const x =
              20 +
              (index / (current.values.length - 1)) *
                550;

            const y =
              145 -
              ((value - min) /
                (max - min || 1)) *
                105;

            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="3.5"
                className="chart-dot"
              />
            );
          })}
        </svg>

      </div>

      <div className="chart-labels">
        {current.labels.map((month) => (
          <span key={month}>
            {month}
          </span>
        ))}
      </div>

      <div className="revenue-footer">
        <div>
          <span>AVERAGE MONTHLY</span>
          <strong>
            {period === "12"
              ? "$7,024"
              : "$8,773"}
          </strong>
        </div>

        <div>
          <span>GROWTH</span>
          <strong className="positive-growth">
            {current.change}
          </strong>
        </div>

        <div>
          <span>PERIOD</span>
          <strong>
            {period === "12"
              ? "12 Months"
              : "6 Months"}
          </strong>
        </div>
      </div>

    </div>
  );
}