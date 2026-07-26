import { useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Users, CreditCard, Receipt, LogOut, Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/cards", label: "Cards", icon: CreditCard },
  { href: "/admin/payments", label: "Payments", icon: Receipt },
];

function NavList({ path, onNavigate }) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/authentication/login");
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

export function AdminShell() {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* mobile top bar */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background px-4 md:hidden">
        <button type="button" onClick={() => router.push("/admin")} className="flex items-center gap-2">
          <Logo size="sm" />
          <span className="text-xs font-semibold uppercase text-muted-foreground">Admin</span>
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
          onClick={() => router.push("/admin")}
          className="mb-8 flex items-center gap-2 px-2"
        >
          <Logo size="sm" />
          <span className="text-xs font-semibold uppercase text-muted-foreground">Admin</span>
        </button>
        <div className="flex-1">
          <NavList path={path} />
        </div>
      </aside>
    </>
  );
}

export default AdminShell;
