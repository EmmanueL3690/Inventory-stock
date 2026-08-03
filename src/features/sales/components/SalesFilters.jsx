import React from 'react';

export const SalesFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4 p-4 bg-white rounded shadow">
      <input
        type="text"
        name="search"
        placeholder="Search customer, invoice, SKU..."
        value={filters.search}
        onChange={handleChange}
        className="border p-2 rounded w-full md:w-1/4"
      />
      <select
        name="paymentStatus"
        value={filters.paymentStatus}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="partially_paid">Partially Paid</option>
        <option value="voided">Voided</option>
      </select>
      <select
        name="paymentMethod"
        value={filters.paymentMethod}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">All Methods</option>
        <option value="cash">Cash</option>
        <option value="card">Card</option>
        <option value="transfer">Transfer</option>
      </select>
      <input
        type="date"
        name="startDate"
        value={filters.startDate}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="date"
        name="endDate"
        value={filters.endDate}
        onChange={handleChange}
        className="border p-2 rounded"
      />
    </div>
  );
};

export default SalesFilters;