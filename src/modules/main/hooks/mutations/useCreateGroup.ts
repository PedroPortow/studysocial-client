import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { createGroup } from "../../services/group";
import { CreateGroupParams, Group } from "@/types";
import RESOURCES from "@/constants/resources";

type UseCreateGroupOptions = Omit<
  UseMutationOptions<AxiosResponse<Group>, Error, CreateGroupParams>,
  "mutationFn"
>;

export function useCreateGroup(options?: UseCreateGroupOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: createGroup,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.GROUPS] });

      // @ts-expect-error - é a vida
      options?.onSuccess?.(...args);
    },
  });
}
