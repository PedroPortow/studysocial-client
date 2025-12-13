import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login } from "../services";
import { LoginRequest, LoginResponse } from "../types";

type UseLoginOptions = UseMutationOptions<LoginResponse, Error, LoginRequest>;

export function useLogin(options: UseLoginOptions) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/");
    },
    ...options,
  });
}
