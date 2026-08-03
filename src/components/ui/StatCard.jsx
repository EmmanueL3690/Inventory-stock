import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  change,
  isPositive,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all duration-300">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-2">
            {value}
          </h3>
        </div>

        {Icon && (
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}
          >
            <Icon
              size={22}
              className={iconColor}
            />
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5">

        <p className="text-sm text-slate-400">
          {subtitle}
        </p>

        {change && (
          <div
            className={`flex items-center gap-1 text-sm font-semibold ${
              isPositive
                ? "text-emerald-600"
                : "text-red-500"
            }`}
          >
            {isPositive ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}

            <span>{change}</span>
          </div>
        )}

      </div>

    </div>
  );
};

export default StatCard;