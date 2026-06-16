import React from 'react';
import { AlertTriangle, Package, Info, CheckCircle2 } from 'lucide-react';

const badgeConfigs = {
  "Critical": { icon: AlertTriangle, color: "text-rose-600" },
  "Low Stock": { icon: Package, color: "text-amber-500" },
  "Info": { icon: Info, color: "text-blue-500" },
  "Resolved": { icon: CheckCircle2, color: "text-emerald-500" }
};

const AlertTypeBadge = ({ type }) => {
  const config = badgeConfigs[type] || badgeConfigs.Info;
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <Icon size={16} className={`${config.color} shrink-0`} strokeWidth={2.5} />
      <span className={`text-sm font-bold ${config.color}`}>{type}</span>
    </div>
  );
};

export default AlertTypeBadge;