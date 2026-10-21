import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { salesTrend } from "@/lib/dashboard-data";

const chartWidth = 760;
const chartHeight = 218;
const inset = { top: 16, right: 10, bottom: 30, left: 54 };
const values = salesTrend.map((item) => item.amount);
const minValue = 20000;
const maxValue = 70000;
const plotWidth = chartWidth - inset.left - inset.right;
const plotHeight = chartHeight - inset.top - inset.bottom;
const points = values.map((value, index) => ({
  x: inset.left + (plotWidth * index) / (values.length - 1),
  y: inset.top + plotHeight * (1 - (value - minValue) / (maxValue - minValue)),
}));
const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");
const areaPath = `${linePath} L${points[points.length - 1].x},${inset.top + plotHeight} L${points[0].x},${inset.top + plotHeight} Z`;

export function SalesChart() {
  return (
    <section className="panel sales-panel" aria-labelledby="sales-chart-title">
      <div className="panel-heading chart-heading">
        <div>
          <div className="eyebrow">SALES PERFORMANCE</div>
          <h2 id="sales-chart-title">Sales overview</h2>
          <p className="panel-subtitle">Daily revenue for the selected week</p>
        </div>
        <button className="period-button" type="button" disabled aria-label="Showing this week">This week <span aria-hidden="true">⌄</span></button>
      </div>
      <div className="chart-summary">
        <strong>ETB 383,000</strong>
        <span className="trend-positive"><ArrowUpRight size={15} /> 12.8%</span>
        <span className="summary-note">vs. previous week</span>
      </div>
      <div className="chart-scroll">
        <svg className="sales-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-labelledby="chart-title chart-description">
          <title id="chart-title">Sales trend from Monday to Sunday</title>
          <desc id="chart-description">Sales rise through the week and peak on Saturday at 63,400 Ethiopian birr.</desc>
          <defs>
            <linearGradient id="sales-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#74b59b" stopOpacity=".24" />
              <stop offset="100%" stopColor="#74b59b" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[20000, 30000, 40000, 50000, 60000, 70000].map((tick) => {
            const y = inset.top + plotHeight * (1 - (tick - minValue) / (maxValue - minValue));
            return <g key={tick}><line x1={inset.left} x2={chartWidth - inset.right} y1={y} y2={y} className="chart-gridline" /><text x={inset.left - 10} y={y + 4} textAnchor="end" className="chart-label">{tick / 1000}k</text></g>;
          })}
          <path d={areaPath} fill="url(#sales-fill)" />
          <path d={linePath} className="chart-line" />
          {points.map((point, index) => <circle key={salesTrend[index].day} cx={point.x} cy={point.y} r="4" className="chart-point" />)}
          {salesTrend.map((item, index) => <text key={item.day} x={points[index].x} y={chartHeight - 4} textAnchor="middle" className="chart-label">{item.day}</text>)}
        </svg>
      </div>
      <div className="chart-footer"><span><i className="legend-dot" /> This week</span><span><ArrowDownRight size={14} /> Sample figures, not accounting records</span></div>
    </section>
  );
}