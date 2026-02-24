import { z } from "zod"

export const postSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Título é obrigatório" })
    .max(180, { message: "Título deve ter no máximo 180 caracteres" }),
  content: z.string().optional(),
  media: z.instanceof(File).nullable().optional(),
  society_id: z.number().nullable().optional(),
})
