import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/modules/main/hooks/useAuth";

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate replace to="/login" />;

  return <Outlet />;
}
