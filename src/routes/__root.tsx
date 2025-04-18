import Error from "@/pages/error";
import NotFound from "@/pages/not-found";
import { Outlet } from "@tanstack/react-router";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => <Outlet />,
  errorComponent: () => <Error />,
  notFoundComponent: () => <NotFound />,
});
