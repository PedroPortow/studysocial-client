import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getUserGroups } from "../../services/group";

import { Group } from "@/types";
import RESOURCES from "@/constants/resources";

type UseGroupsOptions = Omit<
  UseQueryOptions<Group[], Error>,
  "queryKey" | "queryFn"
>;

export function useUserGroups(options?: UseGroupsOptions) {
  return useQuery({
    queryKey: [RESOURCES.GROUPS, "my"],
    queryFn: async () => (await getUserGroups()).data,
    ...options,
  });
}
