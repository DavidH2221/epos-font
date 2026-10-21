export type Branch = {
  id: string;
  name: string;
  location: string;
};

export type Transaction = {
  id: string;
  customer: string;
  initials: string;
  time: string;
  payment: "Cash" | "Card" | "Bank transfer";
  amount: number;
  status: "Paid" | "Pending";
};

export type InventoryAlert = {
  name: string;
  sku: string;
  stock: number;
  threshold: number;
};

export const branches: Branch[] = [
  { id: "bole", name: "Bole", location: "Addis Ababa" },
  { id: "piassa", name: "Piassa", location: "Addis Ababa" },
];

export const transactions: Transaction[] = [
  { id: "INV-2048", customer: "Selamawit Bekele", initials: "SB", time: "10:42 AM", payment: "Cash", amount: 4850, status: "Paid" },
  { id: "INV-2047", customer: "Abebe Tadesse", initials: "AT", time: "10:18 AM", payment: "Card", amount: 12750, status: "Paid" },
  { id: "INV-2046", customer: "Hana Coffee House", initials: "HC", time: "09:56 AM", payment: "Bank transfer", amount: 8300, status: "Pending" },
  { id: "INV-2045", customer: "Mekdes Girma", initials: "MG", time: "09:31 AM", payment: "Cash", amount: 2150, status: "Paid" },
  { id: "INV-2044", customer: "Dawit Kebede", initials: "DK", time: "09:05 AM", payment: "Card", amount: 6400, status: "Paid" },
];

export const inventoryAlerts: InventoryAlert[] = [
  { name: "Yirgacheffe Coffee 1kg", sku: "GRC-1042", stock: 4, threshold: 12 },
  { name: "Teff Flour 5kg", sku: "GRC-2081", stock: 6, threshold: 15 },
  { name: "Ethiopian Honey 500g", sku: "GRC-3160", stock: 8, threshold: 10 },
];

export const salesTrend = [
  { day: "Mon", amount: 38200 },
  { day: "Tue", amount: 44700 },
  { day: "Wed", amount: 39600 },
  { day: "Thu", amount: 52800 },
  { day: "Fri", amount: 47100 },
  { day: "Sat", amount: 63400 },
  { day: "Sun", amount: 57200 },
];

export const formatETB = (amount: number) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(amount);