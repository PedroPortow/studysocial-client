import { CreateSubjectParams, Subject } from "../types"

import { api } from "@/lib/axios"

const BASE_KEY = "/subjects"

export async function getSubjects() {
  return await api.get<Subject[]>(BASE_KEY)
}

export async function getSubject(id: number) {
  return await api.get<Subject>(`${BASE_KEY}/${id}`)
}

export async function createSubject(data: CreateSubjectParams) {
  return await api.post<Subject>(BASE_KEY, data)
}

export async function updateSubject(id: number, data: { name?: string }) {
  return await api.put<Subject>(`${BASE_KEY}/${id}`, data)
}

export async function deleteSubject(id: number) {
  return await api.delete(`${BASE_KEY}/${id}`)
}
