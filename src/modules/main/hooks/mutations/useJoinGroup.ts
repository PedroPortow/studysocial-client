import { useMutation, useQueryClient } from "@tanstack/react-query"

import { joinGroup } from "../../services/group"

import RESOURCES from "@/constants/resources"

export function useJoinGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => joinGroup(id),
    onSuccess: (response, groupId) => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.GROUPS] })
      queryClient.invalidateQueries({ queryKey: [RESOURCES.GROUPS, groupId] })
    },
  })
}
