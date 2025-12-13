import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Email inválido" })
    .refine((email) => email.endsWith("@inf.ufpel.edu.br"), {
      message: "Email deve ser @inf.ufpel.edu.br",
    }),
  password: z
    .string()
    .min(4, { message: "Senha deve ter pelo menos 4 caracteres" }),
});
