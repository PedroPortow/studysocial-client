import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { createComment } from "../../services/comment";
import { Comment, CreateCommentParams } from "../../types";

import RESOURCES from "@/constants/resources";

type UseCreateCommentOptions = Omit<
  UseMutationOptions<
    AxiosResponse<Comment>,
    Error,
    { postId: number; data: CreateCommentParams }
  >,
  "mutationFn"
>;

export function useCreateComment(options?: UseCreateCommentOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: ({ postId, data }) => createComment(postId, data),
    onSuccess: (data, variables, context) => {
      // Invalida comentários e contagem
      queryClient.invalidateQueries({
        queryKey: [RESOURCES.COMMENTS, variables.postId],
      });

      // @ts-expect-error - é a vida
      options?.onSuccess?.(data, variables, context);
    },
  });
}
