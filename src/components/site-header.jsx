import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "cards", label: "Cards" },
  { id: "feature", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
  { id: "blog", label: "About" },
];

export function SiteHeader({ sectionref }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionref || !Array.isArray(sectionref)) return;
      const scrollPosition = window.scrollY + 120;

      sectionref.forEach((ref) => {
        if (!ref || !ref.current) return;
        const section = ref.current;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionref]);

  const scrollToIndex = (index) => {
    sectionref?.[index]?.current?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const NavLink = ({ index, id, label, className }) => (
    <button
      type="button"
      onClick={() => scrollToIndex(index)}
      className={cn(
        "text-sm font-semibold text-muted-foreground transition-colors hover:text-primary",
        activeSection === id && "text-primary",
        className,
      )}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={() => router.push("/")} className="flex items-center">
          <Logo size="sm" />
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item, index) => (
            <NavLink key={item.id} index={index} {...item} />
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" onClick={() => router.push("/authentication/login")}>
            Log in
          </Button>
          <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />}>
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="mt-10 flex flex-col gap-6 px-4">
              <nav className="flex flex-col gap-4">
                {NAV_ITEMS.map((item, index) => (
                  <NavLink key={item.id} index={index} {...item} className="text-left text-base" />
                ))}
              </nav>
              <div className="flex flex-col gap-2">
                <SheetClose render={<Button variant="outline" onClick={() => router.push("/authentication/login")} />}>
                  Log in
                </SheetClose>
                <SheetClose render={<Button onClick={() => router.push("/dashboard")} />}>
                  Dashboard
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default SiteHeader;
