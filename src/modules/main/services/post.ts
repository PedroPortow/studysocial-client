import { CreatePostParams, Post } from "../types";

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
