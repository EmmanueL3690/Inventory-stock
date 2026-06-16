export const mockAdjustmentSession = {
  sessionMeta: {
    referenceId: "ADJ-2024-06-05-001",
    location: "Main Warehouse",
    date: "5 Jun 2024, 10:30 AM",
    createdBy: "John Doe (Admin)"
  },
  
  aiInsights: [
    {
      id: "ai-1",
      type: "critical",
      text: "High negative variance detected. The variance is -1.65%, higher than your average of -0.45%."
    },
    {
      id: "ai-2",
      type: "success",
      text: "Frequent shortage: Amoxicillin 250mg Capsule has been short 3 times in the last 30 days."
    },
    {
      id: "ai-3",
      type: "info",
      text: "Recommendation: Consider review of ordering quantity for Vitamin C 500mg Tablet."
    }
  ],

  products: [
    {
      id: "p1",
      name: "Paracetamol 500mg Tablet",
      category: "Tablets",
      sku: "PAR-500-001",
      barcode: "6281030087",
      systemQty: 1250,
      physicalQty: 1300,
      unitCost: 100.00,
      reason: "Manual Correction",
      status: "Pending"
    },
    {
      id: "p2",
      name: "Amoxicillin 250mg Capsule",
      category: "Capsules",
      sku: "AMX-250-002",
      barcode: "6281030088",
      systemQty: 800,
      physicalQty: 750,
      unitCost: 75.00,
      reason: "Damaged",
      status: "Pending"
    },
    {
      id: "p3",
      name: "Cough Syrup 100ml",
      category: "Syrup",
      sku: "CS-100-003",
      barcode: "6281030089",
      systemQty: 400,
      physicalQty: 400,
      unitCost: 150.00,
      reason: "-",
      status: "Confirmed"
    },
    {
      id: "p4",
      name: "Vitamin C 500mg Tablet",
      category: "Tablets",
      sku: "VC-500-004",
      barcode: "6281030090",
      systemQty: 1000,
      physicalQty: 950,
      unitCost: 150.00,
      reason: "Expired",
      status: "Pending"
    },
    {
      id: "p5",
      name: "Ibuprofen 400mg Tablet",
      category: "Tablets",
      sku: "IBU-400-005",
      barcode: "6281030091",
      systemQty: 600,
      physicalQty: 620,
      unitCost: 120.00,
      reason: "Manual Correction",
      status: "Pending"
    },
    {
      id: "p6",
      name: "ORS Rehydration Sachet",
      category: "Sachet",
      sku: "ORS-001-006",
      barcode: "6281030092",
      systemQty: 300,
      physicalQty: 280,
      unitCost: 50.00,
      reason: "Missing",
      status: "Pending"
    },
    {
      id: "p7",
      name: "Zinc Sulphate Tablet",
      category: "Tablets",
      sku: "ZS-100-007",
      barcode: "6281030093",
      systemQty: 500,
      physicalQty: 500,
      unitCost: 80.00,
      reason: "-",
      status: "Confirmed"
    },
    {
      id: "p8",
      name: "Pain Relief Cream 50g",
      category: "Cream",
      sku: "PRC-50-008",
      barcode: "6281030094",
      systemQty: 200,
      physicalQty: 220,
      unitCost: 200.00,
      reason: "Manual Correction",
      status: "Pending"
    }
  ]
};