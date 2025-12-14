import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";

// TODO: Arrumar essa bagunça aqui
export async function getCurrentUser(): Promise<ApiResponse<User>> {
  return (await api.get<ApiResponse<User>>(`/auth/me`)).data.data;
}
