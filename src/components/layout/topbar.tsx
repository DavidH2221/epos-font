"use client";

import { Bell, ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { branches } from "@/lib/dashboard-data";

type TopbarProps = {
  branchId: string;
  onBranchChange: (branchId: string) => void;
  query: string;
  onQueryChange: (query: string) => void;
};

export function Topbar({ branchId, onBranchChange, query, onQueryChange }: TopbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const branch = branches.find((item) => item.id === branchId) ?? branches[0];

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  return (
    <header className="topbar">
      <div className="mobile-brand"><span className="brand-mark"><span>E</span></span><strong>EthioPOS</strong></div>
      <label className="search-box">
        <Search size={17} aria-hidden="true" />
        <input
          ref={searchInputRef}
          aria-label="Search transactions and inventory"
          placeholder="Search transactions or inventory"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <kbd>Ctrl K</kbd>
      </label>
      <div className="topbar-actions">
        <label className="branch-picker">
          <span className="branch-dot" aria-hidden="true" />
          <span className="branch-picker-label">Branch</span>
          <select aria-label="Selected branch" value={branchId} onChange={(event) => onBranchChange(event.target.value)}>
            {branches.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
          </select>
          <span className="branch-location">{branch.location}</span>
          <ChevronDown size={14} aria-hidden="true" />
        </label>
        <div className="notification-wrap">
          <button
            className="icon-button notification-button"
            aria-label={notificationsOpen ? "Close notifications" : "Open notifications"}
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen((open) => !open)}
          >
            <Bell size={18} />
            <span className="notification-dot" />
          </button>
          {notificationsOpen && (
            <div className="notification-popover" role="status">
              <strong>Inventory reminder</strong>
              <p>3 items at {branch.name} are below their stock thresholds.</p>
              <span>Demo notification</span>
            </div>
          )}
        </div>
        <div className="topbar-profile"><div className="user-avatar">MT</div><ChevronDown size={14} aria-hidden="true" /></div>
      </div>
    </header>
  );
}