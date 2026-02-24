import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { getCurrentUser } from "../../../auth/services"

import RESOURCES from "@/constants/resources"
import { User } from "@/types/user"

type useCurrentUserOptions = Omit<UseQueryOptions<User>, "queryKey" | "queryFn">

export function useCurrentUser(options: useCurrentUserOptions) {
  return useQuery<User>({
    queryKey: [RESOURCES.USER],
    queryFn: async () => (await getCurrentUser()).data,
    ...options,
  })
}
