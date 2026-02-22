import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { revokeBan } from "../../services/bans"

import RESOURCES from "@/constants/resources"
import { Ban } from "@/types/ban"

type UseRevokeBanOptions = Omit<
  UseMutationOptions<AxiosResponse<Ban>, Error, number>,
  "mutationFn"
>

export function useRevokeBan(options?: UseRevokeBanOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: async (id: number) => await revokeBan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.BANS] })
      queryClient.invalidateQueries({ queryKey: [RESOURCES.USERS] })
    },
  })
}
