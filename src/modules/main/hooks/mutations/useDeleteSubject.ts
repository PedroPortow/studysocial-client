import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { deleteSubject } from "../../services/subject"

import RESOURCES from "@/constants/resources"

type UseDeleteSubjectOptions = Omit<
  UseMutationOptions<AxiosResponse<void>, Error, number>,
  "mutationFn"
>

export function useDeleteSubject(options?: UseDeleteSubjectOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: deleteSubject,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.SUBJECTS] })
      queryClient.invalidateQueries({ queryKey: [RESOURCES.NOTES] })
      queryClient.invalidateQueries({ queryKey: [RESOURCES.ASSESSMENTS] })
      queryClient.invalidateQueries({ queryKey: [RESOURCES.ABSENCES] })

      // @ts-expect-error - é a vida
      options?.onSuccess?.(data, variables, context)
    },
  })
}
