import { Navigate, Outlet } from "react-router-dom";

import MainLayout from "@/modules/main/components/MainLayout/MainLayout";
import { useAuth } from "@/modules/main/hooks/useAuth";
import { ROLE } from "@/types";

export default function AdminRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate replace to="/login" />;

  if (user.role !== ROLE.ADMIN) return <Navigate replace to="/" />;

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
