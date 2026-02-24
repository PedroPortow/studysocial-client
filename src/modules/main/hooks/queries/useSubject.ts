import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { getSubject } from "../../services/subject"
import { Subject } from "../../types"

import RESOURCES from "@/constants/resources"

type UseSubjectOptions = Omit<
  UseQueryOptions<Subject, Error>,
  "queryKey" | "queryFn"
>

export function useSubject(id: number, options?: UseSubjectOptions) {
  return useQuery({
    queryKey: [RESOURCES.SUBJECTS, id],
    queryFn: async () => (await getSubject(id)).data,
    ...options,
  })
}
