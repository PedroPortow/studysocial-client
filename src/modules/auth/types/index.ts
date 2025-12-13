import { z } from "zod";

import { loginSchema } from "../schemas";

export type LoginRequest = z.infer<typeof loginSchema>;

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

