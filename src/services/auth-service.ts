import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useNavigate } from "@tanstack/react-router";

interface User {
  id: number;
  email: string;
  created_at: string;
}

export function useAuth() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const authKeys = {
    currentUser: ["currentUser"],
  };

  const login = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        const response = await api.post(
          "/auth/token",
          {
            username: email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (response.data.access_token) {
          localStorage.setItem("access_token", response.data.access_token);
        }

        return response.data;
      } catch (error: any) {
        const statusCode = error.response?.status;
        const errorMessage = error.response?.data?.detail || "Failed to login";
        throw { status: statusCode, detail: errorMessage };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const register = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        const response = await api.post("/auth/register", {
          email,
          password,
        });

        return response.data;
      } catch (error: any) {
        const statusCode = error.response?.status;
        const errorMessage =
          error.response?.data?.detail || "Failed to register";
        throw { status: statusCode, detail: errorMessage };
      }
    },
    onSuccess: (variables) => {
      navigate({
        to: "/login",
        search: { email: variables.email },
      });
    },
  });

  const currentUser = useQuery({
    queryKey: authKeys.currentUser,
    queryFn: async (): Promise<User | null> => {
      try {
        const cachedUser = localStorage.getItem("libre_user");
        const cachedTimestamp = localStorage.getItem("libre_user_ts");

        if (cachedUser && cachedTimestamp) {
          const timestamp = parseInt(cachedTimestamp);
          const now = Date.now();
          const oneHour = 60 * 60 * 1000;

          if (now - timestamp < oneHour) {
            return JSON.parse(cachedUser) as User;
          }
        }

        const token = localStorage.getItem("access_token");
        if (!token) {
          return null;
        }

        const response = await api.get("/users/me");
        const userData = response.data;

        localStorage.setItem("libre_user", JSON.stringify(userData));
        localStorage.setItem("libre_user_ts", Date.now().toString());

        return userData;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000,
  });

  const logout = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("libre_user");
      localStorage.removeItem("libre_user_ts");
    },
    onSuccess: () => {
      queryClient.setQueryData(authKeys.currentUser, null);
    },
  });

  return {
    login,
    register,
    currentUser,
    logout,
  };
}
