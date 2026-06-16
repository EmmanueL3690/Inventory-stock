import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/Card";

const PreferencesSection = () => {
  return (
    <Card className="shadow-md border border-slate-100 bg-white">
      {/* Header utilizing your Card sub-components */}
      <CardHeader className="border-b border-slate-50 pb-5">
        <CardTitle className="text-xl font-bold tracking-tight text-slate-900">
          Preferences
        </CardTitle>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage your localization, date intervals, and regional display metrics.
        </p>
      </CardHeader>

      <CardContent className="pt-6">
        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Language */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Language
            </label>
            <div className="relative">
              <select className="w-full h-11 pl-4 pr-10 appearance-none bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                <option>English (US)</option>
                <option>English (UK)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Date Format */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Date Format
            </label>
            <div className="relative">
              <select className="w-full h-11 pl-4 pr-10 appearance-none bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                <option>May 11, 2026</option>
                <option>11/05/2026</option>
                <option>2026-05-11</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Time Format */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Time Format
            </label>
            <div className="relative">
              <select className="w-full h-11 pl-4 pr-10 appearance-none bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                <option>12 Hour (AM/PM)</option>
                <option>24 Hour</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Timezone */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Timezone
            </label>
            <div className="relative">
              <select className="w-full h-11 pl-4 pr-10 appearance-none bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                <option>(GMT+01:00) West Central Africa</option>
                <option>(GMT+00:00) Greenwich Mean Time</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Currency */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Currency
            </label>
            <div className="relative">
              <select className="w-full h-11 pl-4 pr-10 appearance-none bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                <option>NGN - Nigerian Naira (₦)</option>
                <option>USD - US Dollar ($)</option>
                <option>EUR - Euro (€)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end mt-8 pt-5 border-t border-slate-100">
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

export default PreferencesSection;