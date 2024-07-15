"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

function AuthCallbackPage() {
  const router = useRouter();
  console.log("running auth callback page after login");
  const [configId, setConfigId] = useState<string | null>(null);

  useEffect(function () {
    const id = localStorage.getItem("configurationId");
    if (id) setConfigId(id);
  }, []);

  if (configId) {
    router.push(`/configure/preview?id=${configId}`);
    localStorage.removeItem("configurationId");
  } else {
    router.push("/");
  }

  return <Loading />;
}

export default AuthCallbackPage;
