import { z } from "zod";

import { postSchema } from "../schemas/post";

import { User } from "@/types";

export type CreatePostParams = z.infer<typeof postSchema>;

export type Post = {
  id: number;
  title: string;
  content: string;
  media_url: string | null;
  created_at: string;
  updated_at: string;
  user: User;
};
