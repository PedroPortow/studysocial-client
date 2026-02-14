import { createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useCurrentUser } from "../hooks/queries/useCurrentUser";

import { User } from "@/types/user";

type AuthContextType = {
  user?: User;
  isLoading: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const { data: user, isLoading } = useCurrentUser({
    retry: false,
    enabled: Boolean(token),
  });

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
