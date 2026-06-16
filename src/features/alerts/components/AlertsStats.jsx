import React from 'react';
import AlertStatCard from './AlertStatCard';
import { AlertTriangle, Box, Info, CheckCircle } from 'lucide-react';

const AlertsStats = ({ stats }) => {
  const metrics = [
    {
      title: "Critical Alerts",
      value: stats.critical,
      subtext: "Requires immediate action",
      icon: AlertTriangle,
      colorVariant: "rose"
    },
    {
      title: "Low Stock Alerts",
      value: stats.lowStock,
      subtext: "Items running low",
      icon: Box,
      colorVariant: "amber"
    },
    {
      title: "Info Alerts",
      value: stats.info,
      subtext: "General information",
      icon: Info,
      colorVariant: "blue"
    },
    {
      title: "Resolved Alerts",
      value: stats.resolved,
      subtext: "Recently resolved",
      icon: CheckCircle,
      colorVariant: "emerald"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((item, idx) => (
        <AlertStatCard key={idx} {...item} />
      ))}
    </div>
  );
};

export default AlertsStats;