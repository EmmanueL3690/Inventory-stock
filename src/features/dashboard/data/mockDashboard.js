export const mockDashboardData = {
  stats: {
    todaySales: { value: "₦120,000", change: "12.5%", isPositive: true },
    totalInventory: { value: "₦1,800,000", change: "8.3%", isPositive: true },
    lowStock: { count: 8, message: "Requires attention" },
    topProduct: { name: "Paracetamol 500mg", units: "1,250 units sold" }
  },
  salesTrend: [
    { name: 'May 5', amount: 130000 },
    { name: 'May 6', amount: 65000 },
    { name: 'May 7', amount: 110000 },
    { name: 'May 8', amount: 195000 },
    { name: 'May 9', amount: 75000 },
    { name: 'May 10', amount: 155000 },
    { name: 'May 11', amount: 185000 },
  ],
  inventorySummary: {
    totalItems: 320,
    breakdown: [
      { name: 'In Stock', value: 210, percentage: '65.6%', color: '#2563eb' },
      { name: 'Low Stock', value: 58, percentage: '18.1%', color: '#f59e0b' },
      { name: 'Out of Stock', value: 22, percentage: '6.9%', color: '#ef4444' },
      { name: 'Overstock', value: 30, percentage: '9.4%', color: '#10b981' },
    ]
  },
  recentSales: [
    { date: 'May 11, 2025', invoice: 'INV-10045', customer: 'Walk-in Customer', amount: '₦45,000', status: 'Completed' },
    { date: 'May 10, 2025', invoice: 'INV-10044', customer: 'City Hospital', amount: '₦78,500', status: 'Completed' },
    { date: 'May 10, 2025', invoice: 'INV-10043', customer: 'HealthPlus Pharmacy', amount: '₦22,000', status: 'Completed' },
    { date: 'May 9, 2025', invoice: 'INV-10042', customer: 'Walk-in Customer', amount: '₦15,500', status: 'Completed' },
    { date: 'May 9, 2025', invoice: 'INV-10041', customer: 'Greenlife Clinic', amount: '₦32,000', status: 'Completed' },
  ],
  recentAlerts: [
    { product: 'Paracetamol 500mg', detail: 'Only 15 units left in stock', time: '10 mins ago', type: 'low' },
    { product: 'Amoxicillin 250mg', detail: 'Only 8 units left in stock', time: '25 mins ago', type: 'low' },
    { product: 'Cough Syrup 100ml', detail: 'Out of stock', time: '1 hour ago', type: 'empty' },
  ]
};