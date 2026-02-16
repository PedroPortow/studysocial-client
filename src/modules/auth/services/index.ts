import { Course, loginParams, RegisterParams } from "../types";

import { api } from "@/lib/axios";
import { User } from "@/types";

const BASE_KEY = "/auth";

export async function login(data: loginParams) {
  return await api.post(`${BASE_KEY}/login`, data);
}

export async function register(data: RegisterParams) {
  const formData = new FormData();

  formData.append("full_name", data.full_name);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("course", data.course);
  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }

  return await api.post<User>(`${BASE_KEY}/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function getCurrentUser() {
  return await api.get(`${BASE_KEY}/me`);
}

export async function getCourses() {
  return await api.get<Course[]>("/courses");
}
