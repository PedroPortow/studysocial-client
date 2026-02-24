import { Comment, CreateCommentParams } from "../types"

import { api } from "@/lib/axios"

const BASE_KEY = "/posts"

export async function createComment(postId: number, data: CreateCommentParams) {
  return await api.post<Comment>(`${BASE_KEY}/${postId}/comments`, data)
}

export async function getComments(postId: number) {
  return await api.get<Comment[]>(`${BASE_KEY}/${postId}/comments`)
}

export async function updateComment(
  postId: number,
  commentId: number,
  content: string,
) {
  return await api.put<Comment>(`${BASE_KEY}/${postId}/comments/${commentId}`, {
    content,
  })
}

export async function deleteComment(postId: number, commentId: number) {
  return await api.delete(`${BASE_KEY}/${postId}/comments/${commentId}`)
}

export async function getCommentsCount(postId: number) {
  return await api.get<number>(`${BASE_KEY}/${postId}/comments/count`)
}
