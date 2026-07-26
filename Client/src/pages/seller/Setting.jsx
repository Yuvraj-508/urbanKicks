import { Settings } from "lucide-react";
import ComingSoon from "./ComingSoon";

export default function Setting() {
  return (
    <ComingSoon
      icon={Settings}
      title="Settings"
      description="Configure your store profile, billing preferences, staff accounts, security, notifications, and application settings."
    />
  );
}