import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { register } from "../../services";
import { RegisterParams } from "../../types";

import { User } from "@/types";

type UseRegisterOptions = UseMutationOptions<
  AxiosResponse<User>,
  Error,
  RegisterParams
>;

export function useRegister(options?: UseRegisterOptions) {
  return useMutation({
    mutationFn: register,
    ...options,
  });
}
