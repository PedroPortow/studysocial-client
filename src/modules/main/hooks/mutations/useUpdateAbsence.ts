import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { updateAbsence } from "../../services/absence"
import { Absence, UpdateAbsenceParams } from "../../types"

import RESOURCES from "@/constants/resources"

type UpdateAbsenceVariables = {
  id: number
  data: UpdateAbsenceParams
}

type UseUpdateAbsenceOptions = Omit<
  UseMutationOptions<AxiosResponse<Absence>, Error, UpdateAbsenceVariables>,
  "mutationFn"
>

export function useUpdateAbsence(options?: UseUpdateAbsenceOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: ({ id, data }: UpdateAbsenceVariables) =>
      updateAbsence(id, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.ABSENCES] })

      // @ts-expect-error - é a vida
      options?.onSuccess?.(data, variables, context)
    },
  })
}
