import { User } from "./user"

export enum BanType {
  TEMPORARY = "TEMPORARY",
  PERMANENT = "PERMANENT",
}

export type Ban = {
  id: number
  userId: string
  user: User
  bannedBy: string
  reason?: string
  type: BanType
  expiresAt?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  revokedAt?: string
  revokedBy?: string
}

export type BanUserRequest = {
  userId: string
  reason?: string
  type: BanType
  expiresAt?: string
}

export type UpdateBanRequest = {
  reason?: string
  type?: BanType
  expiresAt?: string
}
