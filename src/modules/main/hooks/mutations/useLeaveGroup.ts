import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveGroup } from "../../services/group";
import RESOURCES from "@/constants/resources";

export function useLeaveGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => leaveGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESOURCES.GROUPS] });
    },
  });
}
