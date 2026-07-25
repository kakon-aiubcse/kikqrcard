import Link from "next/link";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";

const COLUMNS = [
  {
    title: "Getting started",
    links: [
      { label: "How it works?", href: "/about/blog" },
      { label: "Cards", href: "/cards/allcards" },
      { label: "Features", href: "/about/features" },
      { label: "Pricing", href: "/payment/pricing" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "/about/contact" },
      { label: "Terms and Conditions", href: "/about/t&c" },
      { label: "FAQ", href: "/about/faq" },
    ],
  },
  {
    title: "Dashboard",
    links: [
      { label: "Profile", href: "/dashboard" },
      { label: "Sign up", href: "/authentication/signup" },
      { label: "Log in", href: "/authentication/login" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex">
              <Logo size="sm" />
            </Link>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="my-8" />
        <p className="text-center text-xs text-muted-foreground">
          &copy; 2025, KIK QRcards. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default SiteFooter;
