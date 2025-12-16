import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getPost } from "../../services/post";
import { Post } from "../../types";

import RESOURCES from "@/constants/resources";

type UsePostOptions = Omit<
  UseQueryOptions<Post, Error>,
  "queryKey" | "queryFn"
>;

export function usePost(id: number, options?: UsePostOptions) {
  return useQuery({
    queryKey: [RESOURCES.POSTS, id],
    queryFn: async () => (await getPost(id)).data,
    ...options,
  });
}
