import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { deletePost } from "../../services/post"

import RESOURCES from "@/constants/resources"

type UseDeletePostOptions = Omit<
  UseMutationOptions<AxiosResponse<void>, Error, number>,
  "mutationFn"
>

export function useDeletePost(options?: UseDeletePostOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: deletePost,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.POSTS] })

      // @ts-expect-error - é a vida
      options?.onSuccess?.(data, variables, context)
    },
  })
}
