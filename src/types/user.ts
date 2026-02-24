export enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface Course {
  name: string
}

export interface User {
  email: string
  full_name: string
  avatar_url: string
  role: ROLE
  course?: Course
}
