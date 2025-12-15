import { loginParams } from "../types";

import { api } from "@/lib/axios";

const BASE_KEY = "/auth";

export async function login(data: loginParams) {
  return await api.post(`${BASE_KEY}/login`, data);
}

export async function getCurrentUser() {
  return await api.get(`${BASE_KEY}/me`);
}
