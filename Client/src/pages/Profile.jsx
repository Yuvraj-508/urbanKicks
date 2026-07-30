import React from "react";
import ComingSoon from "./seller/ComingSoon";
import { Users } from "lucide-react";

function Profile() {
  return (
    <ComingSoon
      icon={Users}
      title="User Profile "
      description="Manage your profile, securely log in or out, view account details, saved addresses, order history, and personalize your Urban Kicks experience."
    />
  );
}

export default Profile;
