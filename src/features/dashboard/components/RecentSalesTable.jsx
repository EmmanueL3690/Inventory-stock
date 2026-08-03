// src/features/dashboard/components/RecentSalesTable.jsx

import React from "react";

export const RecentSalesTable = ({ sales = [] }) => {

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return `₦${Number(amount || 0).toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="p-5 flex items-center justify-between border-b border-slate-100">

        <h2 className="font-bold text-slate-900 text-base">
          Recent Sales
        </h2>

        <button className="text-xs font-semibold text-blue-600 hover:underline">
          View All
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-50 text-xs uppercase text-slate-500">

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Invoice
              </th>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Payment
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {sales.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-8 text-slate-400"
                >
                  No recent sales found.
                </td>

              </tr>

            ) : (

              sales.map((sale) => (

                <tr
                  key={sale._id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >

                  <td className="p-4 text-sm text-slate-600">
                    {formatDate(sale.createdAt)}
                  </td>

                  <td className="p-4 font-medium text-sm">
                    {sale.invoiceNumber}
                  </td>

                  <td className="p-4 text-sm">
                    {sale.customerName}
                  </td>

                  <td className="p-4 capitalize text-sm">
                    {sale.paymentMethod}
                  </td>

                  <td className="p-4 font-semibold text-sm">
                    {formatCurrency(sale.grandTotal)}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        sale.paymentStatus === "paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : sale.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {sale.paymentStatus}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default RecentSalesTable;