import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query"

import { getComments } from "../../services/comment"
import { Comment } from "../../types"

import RESOURCES from "@/constants/resources"

type UseCommentsOptions = Omit<
  UseQueryOptions<Comment[], Error>,
  "queryKey" | "queryFn"
>

export function useComments(postId: number, options?: UseCommentsOptions) {
  return useSuspenseQuery({
    queryKey: [RESOURCES.COMMENTS, postId],
    queryFn: async () => (await getComments(postId)).data,
    ...options,
  })
}
