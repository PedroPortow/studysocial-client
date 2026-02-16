import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getGroups } from "../../services/group";

import { Group } from "@/types";
import RESOURCES from "@/constants/resources";

type UseGroupsOptions = Omit<
  UseQueryOptions<Group[], Error>,
  "queryKey" | "queryFn"
>;

export function useGroups(options?: UseGroupsOptions) {
  return useQuery({
    queryKey: [RESOURCES.GROUPS],
    queryFn: async () => (await getGroups()).data,
    ...options,
  });
}
