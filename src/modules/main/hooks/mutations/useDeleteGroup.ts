import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteGroup } from "../../services/group"

import RESOURCES from "@/constants/resources"

export function useDeleteGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.GROUPS] })
    },
  })
}
