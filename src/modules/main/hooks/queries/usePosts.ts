import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { getPosts, getPostsBySociety } from "../../services/post";
import { Post } from "../../types";

import RESOURCES from "@/constants/resources";

type UsePostsOptions = Omit<
  UseQueryOptions<Post[], Error>,
  "queryKey" | "queryFn"
> & {
  societyId?: number;
};

export function usePosts(options?: UsePostsOptions) {
  const { societyId, ...queryOptions } = options || {};

  return useSuspenseQuery({
    queryKey: societyId 
      ? [RESOURCES.POSTS, RESOURCES.GROUPS, societyId] 
      : [RESOURCES.POSTS],
    queryFn: async () => {
      if (societyId) {
        return (await getPostsBySociety(societyId)).data;
      }
      return (await getPosts()).data;
    },
    ...queryOptions,
  });
}
