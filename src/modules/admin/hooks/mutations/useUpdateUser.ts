import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { updateUser, UpdateUserData } from "../../services/users"

import RESOURCES from "@/constants/resources"
import { User } from "@/types/user"

interface UpdateUserVariables {
  email: string
  data: UpdateUserData
}

type UseUpdateUserOptions = Omit<
  UseMutationOptions<AxiosResponse<User>, Error, UpdateUserVariables>,
  "mutationFn"
>

export function useUpdateUser(options?: UseUpdateUserOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: ({ email, data }: UpdateUserVariables) =>
      updateUser(email, data),
    onSuccess: (data, variables, context) => {
      // Invalidate users list to refetch
      queryClient.invalidateQueries({ queryKey: [RESOURCES.USERS] })

      // Also invalidate current user in case admin edited themselves
      queryClient.invalidateQueries({ queryKey: [RESOURCES.USER] })

      // @ts-expect-error - é a vida
      options?.onSuccess?.(data, variables, context)
    },
  })
}
