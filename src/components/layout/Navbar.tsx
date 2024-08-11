"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { checkIsAdmin } from "@/lib/utils";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ModeToggle } from "../mode-toggle";

function Nabvar() {
  const { isAuthenticated, getClaim } = useKindeBrowserClient();
  const isAdmin = checkIsAdmin(getClaim("roles"));

  return (
    <nav className="sticky z-[55] h-14 inset-x-0 top-0 w-full border-b border-border bg-background/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-border">
          <Link href="/" className="flex z-40 font-semibold">
            case<span className="text-primary">cobra</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <LogoutLink className={buttonVariants({ size: "sm", variant: "ghost" })}>
                  Sign out
                </LogoutLink>
                {isAdmin && (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                  >
                    Dashboard
                  </Link>
                )}
              </>
            ) : (
              <>
                <RegisterLink className={buttonVariants({ size: "sm", variant: "ghost" })}>
                  Sign up
                </RegisterLink>
                <LoginLink className={buttonVariants({ size: "sm", variant: "ghost" })}>
                  Login
                </LoginLink>
              </>
            )}
            <div className="h-8 w-px bg-background hidden sm:block"></div>

            <ModeToggle />

            <Link
              href="/configure/upload"
              className={buttonVariants({
                size: "sm",
                className: "hidden sm:flex items-center gap-1",
              })}
            >
              Create case
              <ArrowRight className="ml-1.5 h-5 w-5" />
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Nabvar;
