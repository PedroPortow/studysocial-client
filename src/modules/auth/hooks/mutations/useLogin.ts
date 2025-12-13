import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { login } from "../../services";
import { loginParams, LoginResponse } from "../../types";

import { ApiResponse } from "@/types/api";

type UseLoginOptions = UseMutationOptions<
  ApiResponse<LoginResponse>,
  Error,
  loginParams
>;

export function useLogin(options: UseLoginOptions) {
  return useMutation({
    mutationFn: login,
    ...options,
  });
}
