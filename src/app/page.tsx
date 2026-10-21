"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  CreditCard,
  MoreHorizontal,
  PackageSearch,
  WalletCards,
} from "lucide-react";
import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { branches, formatETB, inventoryAlerts, transactions } from "@/lib/dashboard-data";

const paymentIcons = {
  Cash: Banknote,
  Card: CreditCard,
  "Bank transfer": WalletCards,
};

export default function DashboardPage() {
  const [branchId, setBranchId] = useState(branches[0].id);
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const visibleTransactions = transactions.filter((item) =>
    [item.id, item.customer, item.payment, item.status].some((value) => value.toLowerCase().includes(normalizedQuery)),
  );
  const visibleAlerts = inventoryAlerts.filter((item) =>
    [item.name, item.sku].some((value) => value.toLowerCase().includes(normalizedQuery)),
  );
  const selectedBranch = branches.find((item) => item.id === branchId) ?? branches[0];

  return (
    <div className="app-shell" id="dashboard">
      <Sidebar />
      <main className="main-column">
        <Topbar branchId={branchId} onBranchChange={setBranchId} query={query} onQueryChange={setQuery} />
        <div className="page-content">
          <div className="demo-banner"><span className="demo-spark" aria-hidden="true">✳</span><span><strong>Demonstration data</strong> · Figures and records are mock data for the Stage 1 review.</span><button type="button" aria-label="Dismiss demonstration notice" onClick={(event) => event.currentTarget.parentElement?.remove()}>Dismiss</button></div>
          <div className="page-heading">
            <div>
              <div className="breadcrumb">Addis Market Co. <span>/</span> {selectedBranch.name} branch</div>
              <h1>Good morning, Meseret <span aria-hidden="true">✳</span></h1>
              <p>Here’s what’s happening with your business today.</p>
            </div>
            <div className="date-stamp"><span className="date-day">TUESDAY</span><strong>21 October 2026</strong></div>
          </div>

          <section className="metrics-grid" aria-label="Business summary">
            <article className="metric-card featured-metric">
              <div className="metric-top"><span>Total sales</span><span className="metric-icon green-icon"><Banknote size={17} /></span></div>
              <strong className="metric-value">{formatETB(284650)}</strong>
              <div className="metric-foot"><span className="metric-change"><ArrowUpRight size={14} /> 8.4%</span><span>vs. yesterday</span></div>
              <div className="metric-accent" />
            </article>
            <article className="metric-card">
              <div className="metric-top"><span>Transactions</span><span className="metric-icon blue-icon"><CreditCard size={17} /></span></div>
              <strong className="metric-value">86</strong>
              <div className="metric-foot"><span className="metric-change"><ArrowUpRight size={14} /> 6.2%</span><span>vs. yesterday</span></div>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span>Average order value</span><span className="metric-icon gold-icon"><WalletCards size={17} /></span></div>
              <strong className="metric-value">{formatETB(3310)}</strong>
              <div className="metric-foot"><span className="metric-change"><ArrowUpRight size={14} /> 2.1%</span><span>vs. yesterday</span></div>
            </article>
            <article className="metric-card alert-metric">
              <div className="metric-top"><span>Low stock items</span><span className="metric-icon coral-icon"><PackageSearch size={17} /></span></div>
              <strong className="metric-value">{inventoryAlerts.length.toString().padStart(2, "0")}</strong>
              <div className="metric-foot"><span className="metric-warning"><ArrowDownRight size={14} /> Needs attention</span><span>at {selectedBranch.name}</span></div>
            </article>
          </section>

          <div className="dashboard-grid">
            <SalesChart />
            <section className="panel inventory-panel" aria-labelledby="inventory-title">
              <div className="panel-heading">
                <div><div className="eyebrow">STOCK CHECK</div><h2 id="inventory-title">Inventory alerts</h2><p className="panel-subtitle">Items below their reorder point</p></div>
                <button className="more-button" type="button" disabled aria-label="More inventory options"><MoreHorizontal size={20} /></button>
              </div>
              <div className="inventory-list">
                {visibleAlerts.length ? visibleAlerts.map((item) => {
                  const level = Math.min(100, Math.round((item.stock / item.threshold) * 100));
                  return <div className="inventory-row" key={item.sku}>
                    <div className="product-thumb" aria-hidden="true">{item.name.startsWith("Yirgacheffe") ? "☕" : item.name.startsWith("Teff") ? "◉" : "♧"}</div>
                    <div className="inventory-info"><strong>{item.name}</strong><span>SKU {item.sku}</span><div className="stock-track"><i style={{ width: `${level}%` }} /></div></div>
                    <div className="stock-count"><strong>{item.stock}</strong><span>of {item.threshold}</span></div>
                  </div>;
                }) : <p className="empty-result">No matching inventory alerts.</p>}
              </div>
              <div className="panel-footer"><span>Showing {visibleAlerts.length} of {inventoryAlerts.length} items</span><span className="alert-label"><i /> Reorder soon</span></div>
            </section>
          </div>

          <section className="panel transactions-panel" aria-labelledby="transactions-title">
            <div className="panel-heading transaction-heading">
              <div><div className="eyebrow">LATEST ACTIVITY</div><h2 id="transactions-title">Recent transactions</h2><p className="panel-subtitle">A live-looking sample of today’s sales</p></div>
              <button type="button" className="view-all-button" disabled>View all transactions <span aria-hidden="true">↗</span></button>
            </div>
            <div className="table-scroll">
              <table>
                <thead><tr><th>INVOICE</th><th>CUSTOMER</th><th>TIME</th><th>PAYMENT</th><th>STATUS</th><th className="amount-column">AMOUNT</th></tr></thead>
                <tbody>
                  {visibleTransactions.length ? visibleTransactions.map((item) => {
                    const PaymentIcon = paymentIcons[item.payment];
                    return <tr key={item.id}>
                      <td className="invoice-id">{item.id}</td>
                      <td><div className="customer-cell"><span className="customer-avatar">{item.initials}</span><strong>{item.customer}</strong></div></td>
                      <td className="time-cell">{item.time}</td>
                      <td><span className="payment-label"><PaymentIcon size={15} />{item.payment}</span></td>
                      <td><span className={`status-badge ${item.status.toLowerCase()}`}><i />{item.status}</span></td>
                      <td className="amount-cell">{formatETB(item.amount)}</td>
                    </tr>;
                  }) : <tr><td colSpan={6} className="empty-result table-empty">No matching transactions.</td></tr>}
                </tbody>
              </table>
            </div>
            <div className="table-footer"><span>Showing {visibleTransactions.length} of {transactions.length} demo transactions</span><span className="table-disclaimer">Not official invoices or accounting records</span></div>
          </section>
          <footer className="page-footer"><span>EthioPOS <i /> Stage 1 dashboard preview</span><span>Business: Addis Market Co. <i /> Branch: {selectedBranch.name}</span></footer>
        </div>
      </main>
    </div>
  );
}