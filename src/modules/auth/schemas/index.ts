import { z } from "zod"

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
})

export const registerSchema = z
  .object({
    full_name: z
      .string()
      .min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
    email: z
      .string()
      .email({ message: "Email inválido" })
      .refine((email) => email.endsWith("@inf.ufpel.edu.br"), {
        message: "Email deve ser @inf.ufpel.edu.br",
      }),
    password: z
      .string()
      .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
    confirm_password: z.string(),
    course: z.string().min(1, { message: "Selecione um curso" }),
    avatar: z.instanceof(File).nullable().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"],
  })
