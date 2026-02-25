import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { createAbsence } from "../../services/absence"
import { Absence, CreateAbsenceParams } from "../../types"

import RESOURCES from "@/constants/resources"

type UseCreateAbsenceOptions = Omit<
  UseMutationOptions<AxiosResponse<Absence>, Error, CreateAbsenceParams>,
  "mutationFn"
>

export function useCreateAbsence(options?: UseCreateAbsenceOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: createAbsence,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.ABSENCES] })

      // @ts-expect-error - é a vida
      options?.onSuccess?.(data, variables, context)
    },
  })
}
