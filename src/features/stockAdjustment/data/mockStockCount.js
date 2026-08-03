export const mockStockCountOverview = {
  countReference: "SC-2024-0007",
  warehouse: "Main Warehouse",
  countDate: "12 Jun 2024, 09:30 AM",
  countedBy: "John Doe",
  countMethod: "Manual Count",
  status: "In Progress"
};

export const mockStockCountItems = [
  {
    id: 1,
    productName: "Paracetamol 500mg Tablet",
    category: "Tablets",
    sku: "PAR-500-001",
    systemQty: 5000,
    countedQty: 4950,
    unitPrice: 15.00,
    status: "Shortage"
  },
  {
    id: 2,
    productName: "Amoxicillin 250mg Capsule",
    category: "Capsules",
    sku: "AMX-250-002",
    systemQty: 2000,
    countedQty: 2000,
    unitPrice: 45.00,
    status: "Match"
  },
  {
    id: 3,
    productName: "Cough Syrup 100ml",
    category: "Syrup",
    sku: "CS-100-003",
    systemQty: 1000,
    countedQty: 1050,
    unitPrice: 120.00,
    status: "Overstock"
  },
  {
    id: 4,
    productName: "Vitamin C 500mg Tablet",
    category: "Tablets",
    sku: "VC-500-004",
    systemQty: 3000,
    countedQty: 2980,
    unitPrice: 20.00,
    status: "Shortage"
  },
  {
    id: 5,
    productName: "Ibuprofen 400mg Tablet",
    category: "Tablets",
    sku: "IBU-400-005",
    systemQty: 2000,
    countedQty: "Scanning...", // Demonstrating custom loading state variant from screenshot
    unitPrice: 25.00,
    status: "Counting"
  },
  {
    id: 6,
    productName: "ORS Rehydration Sachet",
    category: "Sachet",
    sku: "ORS-001-006",
    systemQty: 1500,
    countedQty: 1500,
    unitPrice: 18.00,
    status: "Match"
  },
  {
    id: 7,
    productName: "Zinc Sulphate Tablet",
    category: "Tablets",
    sku: "ZS-100-007",
    systemQty: 1000,
    countedQty: 980,
    unitPrice: 12.00,
    status: "Shortage"
  }
];

export const mockRecentActivity = [
  {
    id: 1,
    type: "created",
    message: "Stock count created",
    timestamp: "12 Jun 2024, 09:30 AM",
    user: "by John Doe"
  },
  {
    id: 2,
    type: "counted",
    message: "28 items counted",
    timestamp: "12 Jun 2024, 10:15 AM",
    user: "by John Doe"
  },
  {
    id: 3,
    type: "variance",
    message: "4 variances found",
    timestamp: "12 Jun 2024, 10:45 AM",
    user: "by John Doe"
  }
];