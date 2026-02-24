import { z } from "zod"

import { loginSchema, registerSchema } from "../schemas"

import { User } from "@/types"

export type loginParams = z.infer<typeof loginSchema>

export type LoginResponse = {
  token: string
  user: User
}

export type RegisterFormData = z.infer<typeof registerSchema>

export type RegisterParams = Omit<RegisterFormData, "confirm_password">

export type Course = {
  name: string
}
