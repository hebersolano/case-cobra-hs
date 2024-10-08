"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

function AuthCallbackPage() {
  const router = useRouter();

  useEffect(
    function () {
      let id = undefined;
      id = localStorage.getItem("configurationId");
      if (typeof id === "string") {
        router.push(`/configure/preview?id=${id}`);
      }
      if (id === null) {
        router.push("/");
      }
    },
    [router]
  );

  return <Loading />;
}

export default AuthCallbackPage;
