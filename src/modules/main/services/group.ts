import { CreateGroupParams, Group } from "@/types";
import { api } from "@/lib/axios";

const BASE_KEY = "/society";

export async function getGroups() {
  return await api.get<Group[]>(BASE_KEY);
}

export async function getGroup(id: number) {
  return await api.get<Group>(`${BASE_KEY}/${id}`);
}

export async function createGroup(data: CreateGroupParams) {
  return await api.post<Group>(BASE_KEY, data);
}

export async function deleteGroup(id: number) {
  return await api.delete(`${BASE_KEY}/${id}`);
}

export async function joinGroup(id: number) {
  return await api.post(`${BASE_KEY}/${id}/join`);
}

export async function leaveGroup(id: number) {
  return await api.post(`${BASE_KEY}/${id}/leave`);
}
