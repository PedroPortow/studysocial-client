import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { forgotPassword } from "../../services"
import { ForgotPasswordParams } from "../../types"

type UseForgotPasswordOptions = UseMutationOptions<
  AxiosResponse,
  Error,
  ForgotPasswordParams
>

export function useForgotPassword(options: UseForgotPasswordOptions) {
  return useMutation({
    mutationFn: forgotPassword,
    ...options,
  })
}
