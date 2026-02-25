import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { resetPassword } from "../../services"
import { ResetPasswordParams } from "../../types"

type UseResetPasswordOptions = UseMutationOptions<
  AxiosResponse,
  Error,
  ResetPasswordParams
>

export function useResetPassword(options: UseResetPasswordOptions) {
  return useMutation({
    mutationFn: resetPassword,
    ...options,
  })
}
