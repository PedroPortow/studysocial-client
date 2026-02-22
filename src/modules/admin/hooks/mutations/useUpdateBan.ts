import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { updateBan } from "../../services/bans"

import RESOURCES from "@/constants/resources"
import { Ban, UpdateBanRequest } from "@/types/ban"

interface UpdateBanVariables {
  id: number
  data: UpdateBanRequest
}

type UseUpdateBanOptions = Omit<
  UseMutationOptions<AxiosResponse<Ban>, Error, UpdateBanVariables>,
  "mutationFn"
>

export function useUpdateBan(options?: UseUpdateBanOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: ({ id, data }: UpdateBanVariables) => updateBan(id, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.BANS] })

      // @ts-expect-error - é a vida
      options?.onSuccess?.(data, variables, context)
    },
  })
}
