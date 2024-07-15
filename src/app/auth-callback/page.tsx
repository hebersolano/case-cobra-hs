"use client";

import { useEffect, useState } from "react";

function AuthCallbackPage() {
  const [configId, setConfigId] = useState<string | null>(null);

  useEffect(function () {
    const id = localStorage.getItem("configurationId");
    if (id) setConfigId(id);
  }, []);

  console.log("config", configId);
  return <div>AuthCallbackPage</div>;
}

export default AuthCallbackPage;
