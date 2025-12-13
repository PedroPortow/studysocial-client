import { createContext, useMemo } from "react";

import { useCurrentUser } from "../hooks/queries/useCurrentUser";

import { User } from "@/types/user";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  const { data: user, isLoading } = useCurrentUser({
    enabled: Boolean(token),
    retry: false,
  });

  const logout = () => {
    localStorage.removeItem("token");
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      logout,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
