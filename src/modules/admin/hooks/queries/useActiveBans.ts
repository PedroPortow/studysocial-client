import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query"

import { getActiveBans } from "../../services/bans"

import RESOURCES from "@/constants/resources"
import { Ban } from "@/types/ban"

type UseActiveBansOptions = Omit<
  UseSuspenseQueryOptions<Ban[], Error>,
  "queryKey" | "queryFn"
>

export function useActiveBans(options?: UseActiveBansOptions) {
  return useSuspenseQuery({
    queryKey: [RESOURCES.BANS, "active"],
    queryFn: async () => {
      const response = await getActiveBans()

      return response.data
    },
    ...options,
  })
}
