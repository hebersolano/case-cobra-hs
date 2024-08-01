import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "../ui/button";

function Footer() {
  return (
    <footer className="bg-background h-20 relative">
      <div className="border-t" />
      <MaxWidthWrapper>
        <div className="py-6 gap-3 md:h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
          <div className="text-center md:text-left pb-2 md:pb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          <div className="flex items-center justify-center  gap-8">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}

export default Footer;
