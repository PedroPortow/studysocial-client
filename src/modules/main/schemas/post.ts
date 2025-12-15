import { z } from "zod";

export const postSchema = z.object({
  content: z.string().min(1, { message: "Conteúdo é obrigatório" }),
  media: z.instanceof(File, { message: "Arquivo inválido" }).optional(),
});
