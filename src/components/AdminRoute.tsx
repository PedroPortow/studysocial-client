import { Navigate, Outlet } from "react-router-dom"

import MainLayout from "@/modules/main/components/MainLayout/MainLayout"
import { useAuth } from "@/modules/main/hooks/useAuth"
import { ROLE } from "@/types"

export default function AdminRoute() {
  const { user, isLoading } = useAuth()

  if (!isLoading && !user) return <Navigate replace to="/login" />

  if (!isLoading && user && user.role !== ROLE.ADMIN)
    return <Navigate replace to="/" />

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
