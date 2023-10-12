import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CheckTokenService } from '../../service/iam/check-token.service';

@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(private readonly checkTokenService: CheckTokenService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers.authorization.replace('Bearer ', '');
        await this.checkTokenService.checkToken(authorizationHeader);
        return new Promise((resolve) => resolve(true));
    }
}
