import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { updateNote } from "../../services/note"
import { Note } from "../../types"

import RESOURCES from "@/constants/resources"

type UpdateNoteVariables = {
  id: number
  data: { title?: string; content?: string }
}

type UseUpdateNoteOptions = Omit<
  UseMutationOptions<AxiosResponse<Note>, Error, UpdateNoteVariables>,
  "mutationFn"
>

export function useUpdateNote(options?: UseUpdateNoteOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: ({ id, data }: UpdateNoteVariables) => updateNote(id, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.NOTES] })

      // @ts-expect-error - é a vida
      options?.onSuccess?.(data, variables, context)
    },
  })
}
