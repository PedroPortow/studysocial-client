import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import { getAbsences } from "../../services/absence"
import { Absence } from "../../types"

import RESOURCES from "@/constants/resources"

type UseAbsencesOptions = Omit<
  UseQueryOptions<Absence[], Error>,
  "queryKey" | "queryFn"
> & {
  subjectId: number
}

export function useAbsences(options: UseAbsencesOptions) {
  const { subjectId, ...queryOptions } = options

  return useQuery({
    queryKey: [RESOURCES.ABSENCES, subjectId],
    queryFn: async () => (await getAbsences(subjectId)).data,
    ...queryOptions,
  })
}
