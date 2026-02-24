import { User } from "./user"

// Society no backend
export interface Group {
  id: number
  name: string
  description: string
  owner: User
  member_count: number
  is_member: boolean
  created_at: string
  updated_at: string
}

export interface CreateGroupParams {
  name: string
  description: string
}
