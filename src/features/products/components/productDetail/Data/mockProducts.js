export const mockProductDetail = {
  id: "prod-001",
  name: "Paracetamol 500mg Tablet",
  status: "Active",
  sku: "PAR-500-001",
  barcode: "6281030087",
  categories: ["Medicines", "Tablet", "Pain Relief"],
  
  stats: {
    currentStock: 1250,
    unitType: "Tablets",
    stockStatus: "In stock",
    inventoryValue: 625000,
    unitsSoldThisMonth: 3450,
    revenueThisMonth: 1725000,
    profitThisMonth: 862500
  },

  info: {
    productName: "Paracetamol 500mg Tablet",
    sku: "PAR-500-001",
    barcode: "6281030087",
    category: "Medicines",
    subCategory: "Pain Relief",
    brand: "HealthPlus",
    unit: "Tablet",
    description: "Effective relief from pain, fever and inflammation. Easy to swallow tablets.",
    supplier: "LifeCare Supplies",
    costPrice: 50.00,
    sellingPrice: 100.00,
    profitMargin: "50.00%",
    taxRate: "7.5%",
    reorderLevel: 200,
    location: "Main Warehouse",
    status: "Active"
  },

  batches: [
    { id: "b1", number: "BTH-2405-01", mfgDate: "20 May 2024", expDate: "20 May 2026", quantity: 600, status: "Good" },
    { id: "b2", number: "BTH-2406-02", mfgDate: "15 Jun 2024", expDate: "15 Jun 2026", quantity: 400, status: "Good" },
    { id: "b3", number: "BTH-2407-03", mfgDate: "10 Jul 2024", expDate: "10 Jul 2026", quantity: 250, status: "Expiring Soon" }
  ],

  aiInsights: [
    { id: "ai-1", type: "growth", text: "Sales for this product increased by 18% compared to last month." },
    { id: "ai-2", type: "warning", text: "Stock may reach reorder level in 5 days based on current sales." },
    { id: "ai-3", type: "expiry", text: "25 tablets from batch BTH-2407-03 will expire in 25 days." }
  ],

  recentActivities: [
    { id: "act-1", date: "5 Jun 2024, 10:30 AM", type: "stock-in", text: "Stock In: +200 Tablets (BTH-2407-03)" },
    { id: "act-2", date: "4 Jun 2024, 03:15 PM", type: "sale", text: "Sold: 120 Tablets" },
    { id: "act-3", date: "3 Jun 2024, 11:45 AM", type: "adjustment", text: "Stock Adjustment: -10 Tablets" }
  ],

  stockTrend: [
    { date: "May 8", amount: 1950 },
    { date: "May 15", amount: 1600 },
    { date: "May 22", amount: 1420 },
    { date: "May 29", amount: 1310 },
    { date: "Jun 5", amount: 1250 }
  ],

  salesSummary: [
    { period: "1-7 May", value: 400 },
    { period: "8-14 May", value: 650 },
    { period: "15-21 May", value: 920 },
    { period: "22-28 May", value: 800 },
    { period: "29 May - 5 Jun", value: 680 }
  ]
};