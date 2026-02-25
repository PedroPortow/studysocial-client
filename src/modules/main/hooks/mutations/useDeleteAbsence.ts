import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { deleteAbsence } from "../../services/absence"

import RESOURCES from "@/constants/resources"

type UseDeleteAbsenceOptions = Omit<
  UseMutationOptions<AxiosResponse<void>, Error, number>,
  "mutationFn"
>

export function useDeleteAbsence(options?: UseDeleteAbsenceOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: deleteAbsence,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.ABSENCES] })

      // @ts-expect-error - é a vida
      options?.onSuccess?.(data, variables, context)
    },
  })
}
