import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { deleteNote } from "../../services/note"

import RESOURCES from "@/constants/resources"

type UseDeleteNoteOptions = Omit<
  UseMutationOptions<AxiosResponse<void>, Error, number>,
  "mutationFn"
>

export function useDeleteNote(options?: UseDeleteNoteOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: deleteNote,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.NOTES] })

      // @ts-expect-error - é a vida
      options?.onSuccess?.(data, variables, context)
    },
  })
}
