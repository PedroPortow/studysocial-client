import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getLikeStatus } from "../../services/post";
import { LikeResponse } from "../../types";

import RESOURCES from "@/constants/resources";

type UseLikeStatusOptions = Omit<
  UseQueryOptions<LikeResponse, Error>,
  "queryKey" | "queryFn"
>;

export function useLikeStatus(postId: number, options?: UseLikeStatusOptions) {
  return useQuery({
    queryKey: [RESOURCES.POSTS, postId, "like"],
    queryFn: async () => (await getLikeStatus(postId)).data,
    ...options,
  });
}
