import { LogOutIcon, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTheme } from "@/contexts/theme-context";
import { useAuth } from "@/services/auth-service";

export function NavFooter() {
  const { theme, setTheme } = useTheme();

  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <SidebarGroup className="p-0 pb-2 md:pb-0">
      <SidebarMenu className="gap-3">
        <SidebarMenuItem>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 w-[80%]">
              <Button
                className="rounded-full size-7"
                variant="secondary"
                size="icon"
              >
                <UserIcon className="size-4 text-sky-600" />
              </Button>
              <h3 className="text-[13px] font-light break-all">
                {currentUser?.data?.email || "researcher@gmail.com"}
              </h3>
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="size-7 rounded-full transition-colors duration-200"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙" : "🌞"}
            </Button>
          </div>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Button
            className="bg-sky-600 hover:bg-sky-500 rounded-xl w-full"
            onClick={handleLogout}
          >
            <LogOutIcon className="size-4" />
            Logout
          </Button>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <p className="text-xs text-center">
            built with ❤️ by{" "}
            <a
              href="https://mdanzarahmad.vercel.app"
              target="_blank"
              className="font-semibold hover:underline text-sky-600"
            >
              anzar
            </a>
          </p>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
