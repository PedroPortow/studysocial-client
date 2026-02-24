import { createContext, useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import { useCurrentUser } from "../hooks/queries/useCurrentUser"

import { User } from "@/types/user"
import RESOURCES from "@/constants/resources"

type AuthContextType = {
  user?: User
  isLoading: boolean
  login: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isLoading: false,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"))
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: user, isLoading } = useCurrentUser({
    retry: false,
    enabled: Boolean(token),
  })

  const login = useCallback(
    (newToken: string, userData: User) => {
      localStorage.setItem("token", newToken)
      setToken(newToken)
      queryClient.setQueryData([RESOURCES.USER], userData)
    },
    [queryClient],
  )

  const logout = useCallback(() => {
    localStorage.removeItem("token")
    setToken(null)
    queryClient.removeQueries({ queryKey: [RESOURCES.USER] })
    navigate("/login")
  }, [navigate, queryClient])

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
