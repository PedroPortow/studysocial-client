import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { deleteComment } from "../../services/comment"

import RESOURCES from "@/constants/resources"

type UseDeleteCommentOptions = Omit<
  UseMutationOptions<
    AxiosResponse<void>,
    Error,
    { postId: number; commentId: number }
  >,
  "mutationFn"
>

export function useDeleteComment(options?: UseDeleteCommentOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: ({ postId, commentId }) => deleteComment(postId, commentId),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [RESOURCES.COMMENTS, variables.postId],
      })

      // @ts-expect-error - é a vida
      options?.onSuccess?.(data, variables, context)
    },
  })
}
