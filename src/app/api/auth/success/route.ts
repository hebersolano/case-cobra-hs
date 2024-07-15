import db from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("running success route after login...");
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  if (!user || user == null || !user.id)
    throw new Error("Something went wrong with authentication");

  const dbUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    await db.user.create({ data: { id: user.id, email: user.email } });
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth-callback` || "http://localhost:3000/"
  );
}
