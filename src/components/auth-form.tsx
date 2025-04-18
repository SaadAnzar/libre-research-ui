import { useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { useAuth } from "@/services/auth-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AuthForm({ mode }: { mode: "Login" | "Register" }) {
  const search = useSearch({
    strict: false,
  }) as { email: string };

  const userEmail = search?.email ?? "";

  const { register, login } = useAuth();

  const [email, setEmail] = useState<string>(userEmail || "");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      toast.warning("Please fill in all fields!");
      return;
    }

    try {
      if (mode === "Login") {
        await login.mutateAsync({ email, password });
      } else if (mode === "Register") {
        await register.mutateAsync({ email, password });
      }
    } catch (error: any) {
      toast.error(error.detail);
    }
  };

  const isDisabled =
    !email ||
    !password ||
    (mode === "Register" && confirmPassword !== password);

  return (
    <div className="max-w-lg mx-auto px-8">
      <div className="h-full flex flex-col items-center justify-center gap-6">
        <form
          id="auth-form"
          className="w-full space-y-6"
          onSubmit={handleSubmit}
        >
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="w-full h-12 md:text-base"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <div className="relative w-full">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-12 md:text-base pr-12"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sky-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {mode === "Register" && password && (
            <div>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="Confirm Password"
                className="w-full h-12 md:text-base"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              {confirmPassword !== password && (
                <p className="text-sm text-red-500 p-1">Password mismatch!</p>
              )}
            </div>
          )}
          <Button
            className="w-full h-12 text-base bg-sky-600 hover:bg-sky-500"
            type="submit"
            disabled={isDisabled}
          >
            {mode}
          </Button>
        </form>
        {mode === "Login" && (
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              New to Libre Research?
            </p>
            <Link to="/register" className="text-sky-600 underline">
              Register
            </Link>
          </div>
        )}
        {mode === "Register" && (
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              Already have an account?
            </p>
            <Link to="/login" className="text-sky-600 underline">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
