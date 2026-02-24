import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { createPost } from "../../services/post"
import { CreatePostParams, Post } from "../../types"

import RESOURCES from "@/constants/resources"

type UseCreatePostOptions = Omit<
  UseMutationOptions<AxiosResponse<Post>, Error, CreatePostParams>,
  "mutationFn"
>

export function useCreatePost(options?: UseCreatePostOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.POSTS] })

      // @ts-expect-error - é a vida
      options?.onSuccess?.()
    },
  })
}
