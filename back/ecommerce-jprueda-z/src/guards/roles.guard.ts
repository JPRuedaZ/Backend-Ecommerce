import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { Role } from "src/utils/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const hasRole = () => roles.some(role => user.roles?.includes(role));

        const validator = user.roles && user && hasRole();

        if (!validator) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return validator;
    }
}