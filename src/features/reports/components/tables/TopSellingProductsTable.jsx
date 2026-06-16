import React from "react";

const products = [
  {
    rank: 1,
    product: "Paracetamol 500mg",
    category: "Medicines",
    qty: 2450,
    sales: "₦367,500",
  },
  {
    rank: 2,
    product: "Amoxicillin 250mg",
    category: "Medicines",
    qty: 1850,
    sales: "₦277,500",
  },
  {
    rank: 3,
    product: "Vitamin C 500mg",
    category: "Health & Beauty",
    qty: 1320,
    sales: "₦198,000",
  },
  {
    rank: 4,
    product: "Cough Syrup 100ml",
    category: "Medicines",
    qty: 1100,
    sales: "₦165,000",
  },
  {
    rank: 5,
    product: "Baby Diapers (M)",
    category: "Baby Care",
    qty: 980,
    sales: "₦147,000",
  },
];

const TopSellingProductsTable = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm w-full max-w-6xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
        <h3 className="font-semibold text-base sm:text-lg text-gray-800">
          Top Selling Products
        </h3>
      </div>

      {/* Responsive Table Container */}
      <div className="w-full overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="whitespace-nowrap text-left py-3 text-xs sm:text-sm font-semibold text-gray-500 pr-4">
                  Rank
                </th>
                <th className="whitespace-nowrap text-left py-3 text-xs sm:text-sm font-semibold text-gray-500 pr-4">
                  Product
                </th>
                <th className="whitespace-nowrap text-left py-3 text-xs sm:text-sm font-semibold text-gray-500 pr-4">
                  Category
                </th>
                <th className="whitespace-nowrap text-left py-3 text-xs sm:text-sm font-semibold text-gray-500 pr-4">
                  Quantity Sold
                </th>
                <th className="whitespace-nowrap text-left py-3 text-xs sm:text-sm font-semibold text-gray-500">
                  Total Sales
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.rank} className="hover:bg-gray-50/50 transition-colors">
                  <td className="whitespace-nowrap py-3.5 sm:py-4 text-xs sm:text-sm text-gray-600 pr-4">
                    {product.rank}
                  </td>
                  <td className="whitespace-nowrap py-3.5 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 pr-4">
                    {product.product}
                  </td>
                  <td className="whitespace-nowrap py-3.5 sm:py-4 text-xs sm:text-sm text-gray-500 pr-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-[11px] font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-3.5 sm:py-4 text-xs sm:text-sm text-gray-600 pr-4">
                    {product.qty.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-gray-900">
                    {product.sales}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer / Action Section */}
      <div className="flex justify-end mt-5">
        <button className="w-full sm:w-auto border border-gray-200 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-all shadow-sm">
          View Full Report
        </button>
      </div>
    </div>
  );
};

export default TopSellingProductsTable;