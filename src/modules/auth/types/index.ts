import { z } from "zod"

import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../schemas"

import { User } from "@/types"

export type loginParams = z.infer<typeof loginSchema>

export type LoginResponse = {
  token: string
  user: User
}

export type RegisterFormData = z.infer<typeof registerSchema>

export type RegisterParams = Omit<RegisterFormData, "confirm_password">

export type ForgotPasswordParams = z.infer<typeof forgotPasswordSchema>

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export type ResetPasswordParams = {
  token: string
  newPassword: string
}

export type Course = {
  name: string
}
