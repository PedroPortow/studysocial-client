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
    mutationFn: ({ postId, data }) => createComment(postId, data),
    onSuccess: (data, variables, context) => {
      // Invalida a query de comentários do post
      queryClient.invalidateQueries({
        queryKey: [RESOURCES.POSTS, variables.postId, "comments"],
      });

      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
