"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

function AuthCallbackPage() {
  const router = useRouter();
  console.log("running auth callback page after login");
  const [configId, setConfigId] = useState<string | null>(null);

  useEffect(function () {
    const id = localStorage.getItem("configurationId");
    if (id) setConfigId(id);
  }, []);

  if (!configId) return <Loading />;

  if (configId) {
    localStorage.removeItem("configurationId");
    return router.push(`/configure/preview?id=${configId}`);
  } else {
    return router.push("/");
  }
}

export default AuthCallbackPage;
