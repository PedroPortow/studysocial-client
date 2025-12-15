import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getPosts } from "../../services/post";
import { Post } from "../../types";

import RESOURCES from "@/constants/resources";

type UsePostsOptions = Omit<
  UseQueryOptions<Post[], Error>,
  "queryKey" | "queryFn"
>;

export function usePosts(options?: UsePostsOptions) {
  return useQuery({
    queryKey: [RESOURCES.POSTS],
    queryFn: async () => (await getPosts()).data,
    ...options,
  });
}
