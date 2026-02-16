import { api } from "@/lib/axios";
import { User, ROLE } from "@/types/user";

const BASE_KEY = "/users";

export interface UpdateUserData {
  full_name: string;
  role: ROLE;
  course_name?: string;
}

export async function getUsers() {
  return await api.get<User[]>(BASE_KEY);
}

export async function updateUser(email: string, data: UpdateUserData) {
  return await api.put<User>(`${BASE_KEY}/${email}`, data);
}
