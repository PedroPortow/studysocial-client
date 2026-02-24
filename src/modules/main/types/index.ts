import { z } from "zod"

import { postSchema } from "../schemas/post"

import { User } from "@/types"

export type CreatePostParams = z.infer<typeof postSchema>

export type Post = {
  id: number
  title: string
  content: string
  media_url: string | null
  society_id: number | null
  society_name: string | null
  created_at: string
  updated_at: string
  user: User
}

export type LikeResponse = {
  post_id: number
  likes_count: number
  is_liked: boolean
}

export type Comment = {
  id: number
  content: string
  created_at: string
  updated_at: string
  parent_id: number | null
  user: User
  replies: Comment[]
}

export type CreateCommentParams = {
  content: string
  parent_id?: number | null
}

export type Subject = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export type CreateSubjectParams = {
  name: string
}

export type Note = {
  id: number
  title: string
  content: string | null
  subject_id: number
  subject_name: string
  created_at: string
  updated_at: string
  user: User
}

export type CreateNoteParams = {
  title: string
  content?: string
  subject_id: number
}
