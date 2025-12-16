import { CreatePostParams, LikeResponse, Post } from "../types";

import { api } from "@/lib/axios";

const BASE_KEY = "/posts";

export async function createPost(data: CreatePostParams) {
  return await api.post<Post>(BASE_KEY, data);
}

export async function getPosts() {
  return await api.get<Post[]>(BASE_KEY);
}

export async function getPost(id: number) {
  return await api.get<Post>(`${BASE_KEY}/${id}`);
}

export async function getMyPosts() {
  return await api.get<Post[]>(`${BASE_KEY}/me`);
}

export async function deletePost(id: number) {
  return await api.delete(`${BASE_KEY}/${id}`);
}

export async function toggleLike(postId: number) {
  return await api.post<LikeResponse>(`${BASE_KEY}/${postId}/like`);
}

export async function getLikeStatus(postId: number) {
  return await api.get<LikeResponse>(`${BASE_KEY}/${postId}/like`);
}
