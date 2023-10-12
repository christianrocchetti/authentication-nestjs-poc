import { Injectable, Logger } from '@nestjs/common';
import { UserInvalidTokenService } from '../iam/user-invalid-token.service';
import { BaseResponseInterface } from '../../model/base-response.interface';
import { LogoutResponse } from '../../model/logout.response';

@Injectable()
export class UserLogoutService {
    private readonly log = new Logger(UserLogoutService.name);

    constructor(private readonly userInvalidTokenService: UserInvalidTokenService) {}

    async logout(refreshToken: string): Promise<BaseResponseInterface> {
        await this.userInvalidTokenService.invalidToken(refreshToken);
        return new LogoutResponse({});
    }
}
