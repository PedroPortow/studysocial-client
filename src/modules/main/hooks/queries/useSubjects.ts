import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query"

import { getSubjects } from "../../services/subject"
import { Subject } from "../../types"

import RESOURCES from "@/constants/resources"

type UseSubjectsOptions = Omit<
  UseQueryOptions<Subject[], Error>,
  "queryKey" | "queryFn"
>

export function useSubjects(options?: UseSubjectsOptions) {
  return useSuspenseQuery({
    queryKey: [RESOURCES.SUBJECTS],
    queryFn: async () => (await getSubjects()).data,
    ...options,
  })
}
