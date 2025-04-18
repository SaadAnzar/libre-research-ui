import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { MobileHeader } from "@/components/sidebar/mobile-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/services/auth-service";
import { Navigate, Outlet } from "@tanstack/react-router";

export default function RoutesLayout() {
  const {
    currentUser: { data: user, isPending },
  } = useAuth();

  if (!isPending && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <SidebarProvider className="fixed h-full">
      <AppSidebar variant="inset" />
      <SidebarInset>
        <MobileHeader />
        <div className="p-4 overflow-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
