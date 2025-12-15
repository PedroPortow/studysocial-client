import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getCurrentUser } from "../../../auth/services";

import RESOURCES from "@/constants/resources";

type useCurrentUserOptions = Omit<UseQueryOptions, "queryKey" | "queryFn">;

export function useCurrentUser(options: useCurrentUserOptions) {
  return useQuery({
    queryKey: [RESOURCES.USER],
    queryFn: async () => (await getCurrentUser()).data,
    ...options,
  });
}
