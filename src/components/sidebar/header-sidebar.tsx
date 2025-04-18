import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { Link } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeaderSidebar() {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2 justify-between">
        <Link to="/" className="inline-flex items-center gap-2">
          <img src="/libre.svg" alt="Libre Research" className="size-7" />
          <span className="text-xl font-semibold gradient-text">
            Libre Research
          </span>
        </Link>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={toggleSidebar}
          >
            <XIcon className="size-4.5" />
          </Button>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
