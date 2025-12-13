enum RoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User {
  email: string;
  full_name: string;
  avatar_url: string;
  role: RoleEnum;
}
