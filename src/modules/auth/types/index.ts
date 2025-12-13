import { z } from "zod";

import { loginSchema } from "../schemas";

import { User } from "@/types";

export type loginParams = z.infer<typeof loginSchema>;

export type LoginResponse = {
  token: string;
  user: User;
};
