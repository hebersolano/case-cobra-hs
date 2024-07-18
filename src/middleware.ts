import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import type { NextRequest } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    // console.log("look at me", req.kindeAuth);
    return withAuth(req);
  },
  {
    isReturnToCurrentPage: true,
  }
);

export const config = {
  matcher: ["/dashboard"],
};
