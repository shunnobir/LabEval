import React from "react";

function UnauthorizedAccess() {
  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
      <span className="text-2xl">
        ❌ Unauthorized users cannot access private pages
      </span>
      <span className="text-lg">Try to login with privilaged credentials</span>
    </div>
  );
}

export default UnauthorizedAccess;
