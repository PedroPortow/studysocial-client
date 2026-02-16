import { useSuspenseQuery, UseSuspenseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { getUsers } from "../../services/users";

import RESOURCES from "@/constants/resources";
import { User } from "@/types/user";

type UseUsersOptions = Omit<
  UseSuspenseQueryOptions<AxiosResponse<User[]>, Error>,
  "queryKey" | "queryFn"
>;

export function useUsers(options?: UseUsersOptions) {
  return useSuspenseQuery({
    queryKey: [RESOURCES.USERS],
    queryFn: async () => await getUsers(),
    ...options,
  });
}
