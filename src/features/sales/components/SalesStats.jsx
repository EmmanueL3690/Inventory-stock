import React from 'react';

export const SalesStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
      <div className="card p-4 shadow rounded bg-white">
        <span className="text-gray-500 text-sm">Total Revenue</span>
        <h3 className="text-xl font-bold">${stats.totalRevenue.toFixed(2)}</h3>
      </div>
      <div className="card p-4 shadow rounded bg-white">
        <span className="text-gray-500 text-sm">Total Orders</span>
        <h3 className="text-xl font-bold">{stats.totalOrders}</h3>
      </div>
      <div className="card p-4 shadow rounded bg-white">
        <span className="text-gray-500 text-sm">Paid Orders</span>
        <h3 className="text-xl font-bold text-green-600">{stats.paidOrders}</h3>
      </div>
      <div className="card p-4 shadow rounded bg-white">
        <span className="text-gray-500 text-sm">Pending Orders</span>
        <h3 className="text-xl font-bold text-yellow-600">{stats.pendingOrders}</h3>
      </div>
      <div className="card p-4 shadow rounded bg-white">
        <span className="text-gray-500 text-sm">Void Orders</span>
        <h3 className="text-xl font-bold text-red-600">{stats.voidOrders}</h3>
      </div>
      <div className="card p-4 shadow rounded bg-white">
        <span className="text-gray-500 text-sm">Today's Revenue</span>
        <h3 className="text-xl font-bold">${stats.todayRevenue.toFixed(2)}</h3>
      </div>
      <div className="card p-4 shadow rounded bg-white">
        <span className="text-gray-500 text-sm">Today's Orders</span>
        <h3 className="text-xl font-bold">{stats.todayOrders}</h3>
      </div>
    </div>
  );
};