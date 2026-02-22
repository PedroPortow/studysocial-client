import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { banUser } from "../../services/bans"

import RESOURCES from "@/constants/resources"
import { Ban, BanUserRequest } from "@/types/ban"

type UseBanUserOptions = Omit<
  UseMutationOptions<AxiosResponse<Ban>, Error, BanUserRequest>,
  "mutationFn"
>

export function useBanUser(options?: UseBanUserOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (data: BanUserRequest) => banUser(data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.BANS] })
      queryClient.invalidateQueries({ queryKey: [RESOURCES.USERS] })

      // @ts-expect-error - é a vida
      options?.onSuccess?.(data, variables, context)
    },
  })
}
