import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { createPost } from "../../services/post";
import { CreatePostParams, Post } from "../../types";

import RESOURCES from "@/constants/resources";

type UseCreatePostOptions = Omit<
  UseMutationOptions<AxiosResponse<Post>, Error, CreatePostParams>,
  "mutationFn"
>;

export function useCreatePost(options?: UseCreatePostOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (data, variables, context) => {
      // Invalida a query de posts para atualizar a timeline
      queryClient.invalidateQueries({ queryKey: [RESOURCES.POSTS] });

      // Chama o onSuccess passado nas options, se existir
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
