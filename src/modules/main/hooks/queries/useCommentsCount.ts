import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getCommentsCount } from "../../services/comment";

import RESOURCES from "@/constants/resources";

type UseCommentsCountOptions = Omit<
  UseQueryOptions<number, Error>,
  "queryKey" | "queryFn"
>;

export function useCommentsCount(
  postId: number,
  options?: UseCommentsCountOptions,
) {
  return useQuery({
    queryKey: [RESOURCES.COMMENTS, postId, "count"],
    queryFn: async () => (await getCommentsCount(postId)).data,
    ...options,
  });
}
