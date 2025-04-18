import { useSidebar } from "@/components/ui/sidebar";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function MobileHeader() {
  const { toggleSidebar, isMobile } = useSidebar();

  if (!isMobile) return null;

  return (
    <header className="flex h-12 shrink-0 items-center justify-center gap-2 border-b bg-sidebar text-sidebar-foreground">
      <Button
        variant="outline"
        size="icon"
        className="size-7 rounded-sm absolute left-2"
        onClick={toggleSidebar}
      >
        <MenuIcon className="size-4.5" />
      </Button>
      <img src="/libre.svg" alt="Libre Research" className="size-7" />
      <Link
        to="/"
        className="text-xl font-semibold bg-gradient-to-tr from-sky-600 via-sky-300 to-sky-600 bg-clip-text text-transparent"
      >
        Libre Research
      </Link>
    </header>
  );
}
