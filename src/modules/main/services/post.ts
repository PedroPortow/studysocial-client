import { CreatePostParams, LikeResponse, Post } from "../types";

import { api } from "@/lib/axios";

const BASE_KEY = "/posts";

export async function createPost(data: CreatePostParams) {
  const formData = new FormData();

  formData.append("title", data.title);
  if (data.content) {
    formData.append("content", data.content);
  }
  if (data.media) {
    formData.append("media", data.media); // gambiarra feia pra mandar o media basicamente....
  }

  return await api.post<Post>(BASE_KEY, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
