import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/Card";

// Expanded notifications array with unique IDs and descriptive subtext for a real-world feel
const notificationItems = [
  {
    id: "low_stock",
    title: "Low Stock Alerts",
    description: "Receive instant notifications when product inventory falls below set thresholds.",
  },
  {
    id: "new_orders",
    title: "New Orders",
    description: "Get notified as soon as a customer completes a checkout transaction.",
  },
  {
    id: "system_updates",
    title: "System Updates",
    description: "Stay informed about platform features, security updates, and maintenance windows.",
  },
  {
    id: "marketing_offers",
    title: "Marketing & Offers",
    description: "Periodic newsletters about feature rollouts, production optimization tips, and insights.",
  },
];

const NotificationSection = () => {
  return (
    <Card className="shadow-md border border-slate-100 bg-white">
      {/* Header matching your suite structure */}
      <CardHeader className="border-b border-slate-50 pb-5">
        <CardTitle className="text-xl font-bold tracking-tight text-slate-900">
          Notification Preferences
        </CardTitle>
        <p className="text-sm text-slate-500 mt-0.5">
          Choose how and when you want to receive alerts and automated updates.
        </p>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="divide-y divide-slate-100">
          {notificationItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-5 first:pt-4 last:pb-4 group"
            >
              {/* Text Context Content */}
              <div className="flex flex-col pr-6">
                <span className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-slate-900">
                  {item.title}
                </span>
                <span className="text-xs text-slate-500 mt-0.5 leading-relaxed max-w-md">
                  {item.description}
                </span>
              </div>

              {/* Modern Pure-CSS Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="sr-only peer" 
                />
                <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 transition-colors"></div>
              </label>

            </div>
          ))}
        </div>

        {/* Action Button Section */}
        <div className="flex justify-end mt-4 pt-5 border-t border-slate-100">
          <button
            className="
              bg-blue-600
              hover:bg-blue-700
              active:scale-[0.98]
              text-white
              px-5
              h-11
              rounded-lg
              text-sm
              font-semibold
              shadow-sm
              shadow-blue-500/10
              transition-all
              duration-150
              outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              focus-visible:ring-offset-2
            "
          >
            Save Preferences
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSection;