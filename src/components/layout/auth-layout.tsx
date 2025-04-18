import { useAuth } from "@/services/auth-service";
import { Link, Navigate, Outlet } from "@tanstack/react-router";
import { PageLoader } from "@/components/loaders";

export default function AuthLayout() {
  const {
    currentUser: { data: user, isPending },
  } = useAuth();

  if (isPending) {
    return <PageLoader />;
  }

  if (!isPending && user) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="fixed size-full">
      <Link
        to="/"
        className="flex items-center justify-center gap-2 py-12 md:py-16"
      >
        <img src="/libre.svg" alt="Libre Research" className="size-7" />
        <span className="text-3xl md:text-4xl font-semibold gradient-text">
          Libre Research
        </span>
      </Link>
      <Outlet />
    </div>
  );
}
