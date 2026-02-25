import {
  Absence,
  CreateAbsenceParams,
  UpdateAbsenceParams,
} from "../types"

import { api } from "@/lib/axios"

const BASE_KEY = "/absences"

export async function getAbsences(subjectId: number) {
  return await api.get<Absence[]>(BASE_KEY, {
    params: { subject_id: subjectId },
  })
}

export async function getAbsence(id: number) {
  return await api.get<Absence>(`${BASE_KEY}/${id}`)
}

export async function createAbsence(data: CreateAbsenceParams) {
  return await api.post<Absence>(BASE_KEY, data)
}

export async function updateAbsence(id: number, data: UpdateAbsenceParams) {
  return await api.put<Absence>(`${BASE_KEY}/${id}`, data)
}

export async function deleteAbsence(id: number) {
  return await api.delete(`${BASE_KEY}/${id}`)
}
