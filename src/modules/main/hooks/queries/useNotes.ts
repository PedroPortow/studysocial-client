import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query"

import { getNotes } from "../../services/note"
import { Note } from "../../types"

import RESOURCES from "@/constants/resources"

type UseNotesOptions = Omit<
  UseQueryOptions<Note[], Error>,
  "queryKey" | "queryFn"
> & {
  subjectId?: number
}

export function useNotes(options?: UseNotesOptions) {
  const { subjectId, ...queryOptions } = options || {}

  return useSuspenseQuery({
    queryKey: subjectId
      ? [RESOURCES.NOTES, "subject", subjectId]
      : [RESOURCES.NOTES],
    queryFn: async () => {
      return (await getNotes({ subject_id: subjectId })).data
    },
    ...queryOptions,
  })
}
