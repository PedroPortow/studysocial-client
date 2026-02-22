import { api } from "@/lib/axios"
import { Ban, BanUserRequest, UpdateBanRequest } from "@/types/ban"

const BASE_KEY = "/bans"

export async function getActiveBans() {
  return await api.get<Ban[]>(BASE_KEY)
}

export async function getBan(id: number) {
  return await api.get<Ban>(`${BASE_KEY}/${id}`)
}

export async function banUser(data: BanUserRequest) {
  return await api.post<Ban>(`/users/${data.userId}/ban`, data)
}

export async function updateBan(id: number, data: UpdateBanRequest) {
  return await api.put<Ban>(`${BASE_KEY}/${id}`, data)
}

export async function revokeBan(id: number) {
  return await api.delete(`${BASE_KEY}/${id}`)
}

export async function unbanUser(userId: string) {
  return await api.delete(`/users/${userId}/ban`)
}

export async function getUserBan(userId: string) {
  return await api.get<Ban>(`/users/${userId}/ban`)
}
