import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { toggleLike } from "../../services/post";
import { LikeResponse } from "../../types";

import RESOURCES from "@/constants/resources";

type UseToggleLikeOptions = Omit<
  UseMutationOptions<AxiosResponse<LikeResponse>, Error, number>,
  "mutationFn"
>;

export function useToggleLike(options?: UseToggleLikeOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: toggleLike,
    onSuccess: (data, variables, context) => {
      // Invalida a query de likes do post específico
      queryClient.invalidateQueries({
        queryKey: [RESOURCES.POSTS, variables, "like"],
      });

      // @ts-expect-error - é a vida
      options?.onSuccess?.(data, variables, context);
    },
  });
}
