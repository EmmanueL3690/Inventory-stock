import React, { useMemo } from 'react';
import { Users, UserCheck, UserX, UserPlus } from 'lucide-react';

const SupplierKpis = ({ suppliers = [], loading = false }) => {
  // Calculate real-time KPI metrics directly from backend suppliers array
  const kpis = useMemo(() => {
    if (!Array.isArray(suppliers) || suppliers.length === 0) {
      return {
        total: 0,
        active: 0,
        inactive: 0,
        newestName: 'N/A',
      };
    }

    const total = suppliers.length;

    // Count Active vs Inactive
    let active = 0;
    let inactive = 0;

    suppliers.forEach((s) => {
      const status = String(s.status || '').toLowerCase();
      const isActiveBool = s.isActive;

      if (status === 'active' || isActiveBool === true) {
        active += 1;
      } else {
        inactive += 1;
      }
    });

    // Find Newest Supplier based on createdAt date
    const sorted = [...suppliers].sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    const newestName = sorted[0]?.name || sorted[0]?.companyName || 'N/A';

    return {
      total,
      active,
      inactive,
      newestName,
    };
  }, [suppliers]);

  // Formatter for counts
  const formatNumber = (num) => new Intl.NumberFormat('en-NG').format(num || 0);

  const cards = [
    {
      id: 'total-suppliers',
      title: 'Total Suppliers',
      value: formatNumber(kpis.total),
      subtitle: 'All registered vendors',
      icon: Users,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/60',
    },
    {
      id: 'active-suppliers',
      title: 'Active Suppliers',
      value: formatNumber(kpis.active),
      subtitle: 'Ready for purchase orders',
      icon: UserCheck,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      id: 'inactive-suppliers',
      title: 'Inactive Suppliers',
      value: formatNumber(kpis.inactive),
      subtitle: 'Deactivated or suspended',
      icon: UserX,
      iconColor: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-50 dark:bg-amber-950/60',
    },
    {
      id: 'newest-supplier',
      title: 'Newest Supplier',
      value: kpis.newestName,
      subtitle: 'Most recent onboard',
      icon: UserPlus,
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-50 dark:bg-blue-950/60',
      isText: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-all hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between"
          >
            {/* Top Row: Title & Icon */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-xl ${card.iconBg} shrink-0`}>
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>

            {/* Bottom Row: Metric Value & Subtitle */}
            <div className="mt-4 space-y-1">
              {loading ? (
                <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-md" />
              ) : (
                <p
                  className={`font-bold text-slate-900 dark:text-white tracking-tight ${
                    card.isText ? 'text-lg truncate' : 'text-2xl'
                  }`}
                  title={card.isText ? card.value : undefined}
                >
                  {card.value}
                </p>
              )}
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SupplierKpis;