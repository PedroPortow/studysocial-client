import { CreateNoteParams, Note } from "../types"

import { api } from "@/lib/axios"

const BASE_KEY = "/notes"

export async function getNotes(params?: { subject_id?: number }) {
  return await api.get<Note[]>(BASE_KEY, { params })
}

export async function getNote(id: number) {
  return await api.get<Note>(`${BASE_KEY}/${id}`)
}

export async function createNote(data: CreateNoteParams) {
  return await api.post<Note>(BASE_KEY, data)
}

export async function updateNote(
  id: number,
  data: { title?: string; content?: string },
) {
  return await api.put<Note>(`${BASE_KEY}/${id}`, data)
}

export async function deleteNote(id: number) {
  return await api.delete(`${BASE_KEY}/${id}`)
}
