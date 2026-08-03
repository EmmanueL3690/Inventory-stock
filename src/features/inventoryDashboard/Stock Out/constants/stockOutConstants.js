export const STOCK_OUT_REASONS = [
  { value: 'Sale', label: 'Sale' },
  { value: 'Damaged', label: 'Damaged' },
  { value: 'Expired', label: 'Expired' },
  { value: 'Transfer', label: 'Transfer' },
  { value: 'Internal Use', label: 'Internal Use' },
  { value: 'Sample', label: 'Sample' },
  { value: 'Other', label: 'Other' },
];

export const MOCK_PRODUCTS = [
  { _id: 'p1', name: 'Premium Wireless Headphones', sku: 'PRM-WHP-01', currentStock: 45, category: 'Electronics' },
  { _id: 'p2', name: 'Ergonomic Office Chair', sku: 'ERG-CHR-12', currentStock: 12, category: 'Furniture' },
  { _id: 'p3', name: 'Mechanical Gaming Keyboard', sku: 'MECH-KEY-88', currentStock: 28, category: 'Electronics' },
  { _id: 'p4', name: 'UltraWide 34" Monitor', sku: 'ULT-MON-34', currentStock: 8, category: 'Electronics' },
  { _id: 'p5', name: 'USB-C Multi-Port Hub', sku: 'USBC-HUB-05', currentStock: 150, category: 'Accessories' },
];

export const MOCK_RECENT_STOCK_OUT = [
  {
    id: 'STK-OUT-001',
    reference: 'REF-2026-001',
    productName: 'Premium Wireless Headphones',
    sku: 'PRM-WHP-01',
    quantity: 5,
    reason: 'Sale',
    processedBy: 'Kunle A.',
    date: '2026-07-14 10:15 AM',
    status: 'Completed',
  },
  {
    id: 'STK-OUT-002',
    reference: 'REF-2026-002',
    productName: 'Ergonomic Office Chair',
    sku: 'ERG-CHR-12',
    quantity: 2,
    reason: 'Damaged',
    processedBy: 'Sarah O.',
    date: '2026-07-14 08:30 AM',
    status: 'Verified',
  },
  {
    id: 'STK-OUT-003',
    reference: 'REF-2026-003',
    productName: 'UltraWide 34" Monitor',
    sku: 'ULT-MON-34',
    quantity: 1,
    reason: 'Transfer',
    processedBy: 'Kunle A.',
    date: '2026-07-13 04:45 PM',
    status: 'Pending',
  },
];