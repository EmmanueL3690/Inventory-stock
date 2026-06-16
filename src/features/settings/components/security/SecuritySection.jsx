import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/Card";

const SecuritySection = () => {
  return (
    <Card className="shadow-md border border-slate-100 bg-white">
      {/* Header matching your dashboard layout suite */}
      <CardHeader className="border-b border-slate-50 pb-5">
        <CardTitle className="text-xl font-bold tracking-tight text-slate-900">
          Security Settings
        </CardTitle>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage authentication methods, passwords, and track real-time access sessions.
        </p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4">
          
          {/* Action Row: Change Password */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-100 rounded-xl p-5 hover:bg-slate-50/40 transition-colors duration-200">
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold text-slate-800">
                Change Password
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                Ensure your account is using a strong, unique value to prevent unauthorized penetration.
              </p>
            </div>

            <button 
              className="
                self-start sm:self-center
                h-9 px-4
                bg-white hover:bg-slate-50 active:scale-[0.98]
                border border-slate-200 rounded-lg 
                text-xs font-semibold text-slate-700
                shadow-sm transition-all duration-150
                outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
              "
            >
              Update Password
            </button>
          </div>

          {/* Action Row: Two-Factor Authentication */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-100 rounded-xl p-5 hover:bg-slate-50/40 transition-colors duration-200">
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold text-slate-800">
                Two-Factor Authentication (2FA)
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                Add an extra layer of system integrity by requiring an authenticator code on login credentials.
              </p>
            </div>

            {/* Modern Pill Status Badge */}
            <div className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 h-7 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold tracking-wide border border-emerald-100">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Active
            </div>
          </div>

          {/* Action Row: Active Sessions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-100 rounded-xl p-5 hover:bg-slate-50/40 transition-colors duration-200">
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold text-slate-800">
                Active Sessions
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                Manage your active sessions.
              </p>
            </div>

            <button 
              className="
                self-start sm:self-center
                h-9 px-4
                bg-white hover:bg-slate-50 active:scale-[0.98]
                border border-slate-200 rounded-lg 
                text-xs font-semibold text-slate-700
                shadow-sm transition-all duration-150
                outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
              "
            >
              Manage Sessions
            </button>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySection;