import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { getGroup } from "../../services/group"

import { Group } from "@/types"
import RESOURCES from "@/constants/resources"

type UseGroupOptions = Omit<
  UseQueryOptions<Group, Error>,
  "queryKey" | "queryFn"
>

export function useGroup(id: number, options?: UseGroupOptions) {
  return useQuery({
    queryKey: [RESOURCES.GROUPS, id],
    queryFn: async () => (await getGroup(id)).data,
    ...options,
  })
}
