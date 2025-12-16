import {
    useMutation,
    UseMutationOptions,
    useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { deleteComment } from "../../services/comment";

import RESOURCES from "@/constants/resources";

type UseDeleteCommentOptions = Omit<
  UseMutationOptions<
    AxiosResponse<void>,
    Error,
    { postId: number; commentId: number }
  >,
  "mutationFn"
>;

export function useDeleteComment(options?: UseDeleteCommentOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, commentId }) => deleteComment(postId, commentId),
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
