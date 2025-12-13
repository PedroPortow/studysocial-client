import { loginParams, LoginResponse } from "../types";

import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api";

export async function login(
  data: loginParams,
): Promise<ApiResponse<LoginResponse>> {
  return (await api.post<ApiResponse<LoginResponse>>("/auth/login", data)).data;
}
