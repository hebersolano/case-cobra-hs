import { checkIsAdmin } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";

async function page() {
  const { getClaim } = getKindeServerSession();
  const userRoles = await getClaim("roles");
  if (!userRoles) notFound();

  const isAdmin = checkIsAdmin(userRoles);
  if (!isAdmin) notFound();

  console.log("token userRoles", userRoles);

  return <div className="flex min-h-screen w-full bg-muted/40">IS ADMIN!!!</div>;
}

export default page;
