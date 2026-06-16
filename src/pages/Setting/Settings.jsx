import SettingsSidebar from "../../features/settings/components/SettingsSidebar";
import ProfileSection from "../../features/settings/components/profile/ProfileSection";
import NotificationSection from "../../features/settings/components/notifications/NotificationSection";
import PreferencesSection from "../../features/settings/components/preferences/PreferencesSection";
import SecuritySection from "../../features/settings/components/security/SecuritySection";

const Settings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="text-slate-500 mt-1">
          Manage your account, preferences and system settings.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <SettingsSidebar />
        </div>

        <div className="col-span-9 space-y-6">
          <ProfileSection />
          <NotificationSection />
          <PreferencesSection />
          <SecuritySection />
        </div>
      </div>
    </div>
  );
};

export default Settings;