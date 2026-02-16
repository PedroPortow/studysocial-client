import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getCourses } from "../../services";
import { Course } from "../../types";

import RESOURCES from "@/constants/resources";

type UseCoursesOptions = Omit<
  UseQueryOptions<Course[], Error>,
  "queryKey" | "queryFn"
>;

export function useCourses(options?: UseCoursesOptions) {
  return useQuery({
    queryKey: [RESOURCES.COURSES],
    queryFn: async () => (await getCourses())?.data,
    ...options,
  });
}
