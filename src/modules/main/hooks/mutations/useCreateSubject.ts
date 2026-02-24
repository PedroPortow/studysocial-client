import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { createSubject } from "../../services/subject"
import { CreateSubjectParams, Subject } from "../../types"

import RESOURCES from "@/constants/resources"

type UseCreateSubjectOptions = Omit<
  UseMutationOptions<AxiosResponse<Subject>, Error, CreateSubjectParams>,
  "mutationFn"
>

export function useCreateSubject(options?: UseCreateSubjectOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: createSubject,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.SUBJECTS] })

      // @ts-expect-error - é a vida
      options?.onSuccess?.(data, variables, context)
    },
  })
}
