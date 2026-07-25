import { useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, CreditCard, Receipt, UserCog, LogOut, Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cards/mycards", label: "My Cards", icon: CreditCard },
  { href: "/payment/orders", label: "Orders", icon: Receipt },
  { href: "/payment/billings", label: "Payment", icon: Receipt },
  { href: "/dashboard/editprofile", label: "Edit Profile", icon: UserCog },
];

const checkUrlExists = async (url, timeout = 3000) => {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, { method: "HEAD", signal: controller.signal });
    clearTimeout(id);
    return response.ok;
  } catch {
    return false;
  }
};

function NavList({ path, onNavigate }) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    const url1 = "https://kikqrcard.netlify.app/authentication/login";
    const url2 = "http://localhost:7000/authentication/login";
    const exists = await checkUrlExists(url1);
    window.location.href = exists ? url1 : url2;
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <button
            key={href}
            type="button"
            onClick={() => {
              router.push(href);
              onNavigate?.();
            }}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              path === href && "bg-primary/10 text-primary",
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </nav>

      <Button
        variant="destructive"
        className="justify-start gap-3"
        onClick={handleLogout}
      >
        <LogOut className="size-4" />
        Logout
      </Button>
    </div>
  );
}

export function DashboardShell() {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* mobile top bar */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background px-4 md:hidden">
        <button type="button" onClick={() => router.push("/")} className="flex items-center">
          <Logo size="sm" />
        </button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" />}>
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="mt-10 flex h-[calc(100%-2.5rem)] flex-col px-4">
              <NavList path={path} onNavigate={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-background p-4 md:flex">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mb-8 flex items-center px-2"
        >
          <Logo size="sm" />
        </button>
        <div className="flex-1">
          <NavList path={path} />
        </div>
      </aside>
    </>
  );
}

export default DashboardShell;
