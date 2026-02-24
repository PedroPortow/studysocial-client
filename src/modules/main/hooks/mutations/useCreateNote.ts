import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { createNote } from "../../services/note"
import { CreateNoteParams, Note } from "../../types"

import RESOURCES from "@/constants/resources"

type UseCreateNoteOptions = Omit<
  UseMutationOptions<AxiosResponse<Note>, Error, CreateNoteParams>,
  "mutationFn"
>

export function useCreateNote(options?: UseCreateNoteOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: createNote,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.NOTES] })

      // @ts-expect-error - é a vida
      options?.onSuccess?.(...args)
    },
  })
}
