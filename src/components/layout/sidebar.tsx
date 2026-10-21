import {
  BarChart3,
  Boxes,
  Building2,
  FileText,
  LayoutDashboard,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "lucide-react";

const navigation = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Point of sale", icon: ShoppingCart },
  { label: "Products", icon: Boxes },
  { label: "Sales & invoices", icon: FileText },
  { label: "Customers", icon: Users },
  { label: "Branches", icon: Building2 },
  { label: "Reports", icon: BarChart3 },
  { label: "Settings", icon: Settings2 },
];

export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <a className="brand" href="#dashboard" aria-label="EthioPOS overview">
        <span className="brand-mark"><ShoppingBag size={20} strokeWidth={2.2} /></span>
        <span className="brand-copy"><strong>EthioPOS</strong><small>RETAIL WORKSPACE</small></span>
      </a>

      <div className="tenant-switcher">
        <span className="tenant-avatar">A</span>
        <span className="tenant-copy"><strong>Addis Market Co.</strong><small>Business workspace</small></span>
        <span className="tenant-caret" aria-hidden="true">⌄</span>
      </div>

      <div className="nav-section-label">WORKSPACE</div>
      <nav className="nav-list">
        {navigation.map(({ label, icon: Icon, active }) =>
          active ? (
            <a className="nav-item active" href="#dashboard" aria-current="page" key={label}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
            </a>
          ) : (
            <span className="nav-item nav-unavailable" aria-disabled="true" title="Available in a later project stage" key={label}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span><span className="nav-lock">Later</span>
            </span>
          ),
        )}
      </nav>

      <div className="sidebar-bottom">
        <div className="help-panel">
          <span className="help-kicker">STAGE 1 PREVIEW</span>
          <p>Dashboard data is sample information for review.</p>
        </div>
        <div className="sidebar-user">
          <div className="user-avatar">MT</div>
          <div className="user-copy"><strong>Meseret T.</strong><small>Tenant admin</small></div>
          <span className="user-menu-dots" aria-hidden="true">•••</span>
        </div>
      </div>
    </aside>
  );
}