import { api } from "@/lib/axios";
import { User } from "@/types/user";

export async function getCurrentUser(): Promise<User> {
  return (await api.get<User>(`/auth/me`)).data;
}
