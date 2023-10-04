import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader) {
            throw new BadRequestException(['authorization header missing']);
        }
        return true;
    }
}
