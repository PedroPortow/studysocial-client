import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getCurrentUser } from "../../services/user";

import RESOURCES from "@/constants/resources";

type useCurrentUserOptions = Omit<UseQueryOptions, "queryKey" | "queryFn">;

export function useCurrentUser(options: useCurrentUserOptions) {
  return useQuery({
    queryKey: [RESOURCES.USER],
    queryFn: getCurrentUser,
    ...options,
  });
}
