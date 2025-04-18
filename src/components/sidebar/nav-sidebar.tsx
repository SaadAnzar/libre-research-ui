import { Link, useLocation } from "@tanstack/react-router";
import { ClockIcon, HomeIcon, LucideIcon, SearchIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface NavLinkProps {
  title: string;
  href: string;
  icon: LucideIcon;
}

const navLinks: NavLinkProps[] = [
  {
    title: "Home",
    href: "/home",
    icon: HomeIcon,
  },
  {
    title: "Research",
    href: "/research",
    icon: SearchIcon,
  },
  {
    title: "History",
    href: "/history",
    icon: ClockIcon,
  },
];

export function NavSidebar() {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-3">
        {navLinks.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              className="h-10 gap-4 px-4 rounded-xl data-[active=true]:text-sky-600"
              isActive={location.pathname.startsWith(item.href)}
            >
              <Link to={item.href}>
                <item.icon strokeWidth={2.5} />
                <span className="text-base">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
