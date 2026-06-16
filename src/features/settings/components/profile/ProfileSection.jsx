import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/Card";

const ProfileSection = () => {
  return (
    <Card className="shadow-md border border-slate-100 bg-white">
      {/* Header utilizing your Card sub-components */}
      <CardHeader className="border-b border-slate-50 pb-5">
        <CardTitle className="text-xl font-bold tracking-tight text-slate-900">
          Profile Information
        </CardTitle>
        <p className="text-sm text-slate-500 mt-0.5">
          Update your account details, avatar, and system role settings.
        </p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Avatar Management */}
          <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
            <div className="relative group cursor-pointer">
              <img
                src="https://i.pravatar.cc/150"
                alt="Profile Avatar"
                className="w-32 h-32 rounded-full ring-4 ring-slate-50 group-hover:ring-slate-100 transition-all duration-200 object-cover"
              />
              {/* Modern Hover Overlay for Image Upload */}
              <div className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0x" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column: Form Inputs */}
          <div className="md:col-span-8 space-y-5">
            
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Full Name
              </label>
              <input
                type="text"
                className="w-full h-11 px-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                defaultValue="ifey jackie"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Email Address
              </label>
              <input
                type="email"
                className="w-full h-11 px-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                defaultValue="jackie.ifey@stocklytics.com"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full h-11 px-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                defaultValue="+1 202-555-0186"
              />
            </div>

            {/* Role / Access Level */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Access Role
              </label>
              <div className="relative">
                <select className="w-full h-11 pl-4 pr-10 appearance-none bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                  <option>Administrator</option>
                  <option>Manager</option>
                  <option>Editor</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
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
                Save Changes
              </button>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;