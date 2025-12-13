import { api } from "@/lib/axios";

import { LoginRequest, LoginResponse } from "../types";

export async function login(data: LoginRequest): Promise<LoginResponse> {
  return (await api.post<LoginResponse>("/auth/login", data)).data;
}

