import { SetMetadata } from "@nestjs/common";
import { Role } from "src/user/user.enum";

export const Roles = (...roles: Role[]) => SetMetadata('role', roles)