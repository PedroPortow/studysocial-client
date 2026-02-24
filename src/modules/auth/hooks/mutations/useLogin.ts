import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { login } from "../../services"
import { loginParams, LoginResponse } from "../../types"

type UseLoginOptions = UseMutationOptions<
  AxiosResponse<LoginResponse>,
  Error,
  loginParams
>

export function useLogin(options: UseLoginOptions) {
  return useMutation({
    mutationFn: login,
    ...options,
  })
}
