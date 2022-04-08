import { Role } from "./entities/role.enum";

export interface JwtPayload {
  email: string;
  roles: Role[];
}
