import { Body, Controller, Delete, Headers, Post, Req } from '@nestjs/common';
import { LoginService } from '../service/login/user-login.service';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthorizationGuard } from './validator/authorization.guard';
import { UserLogDataMapper } from '../mapper/log-user-data-dto.mapper';
import { UserLogData } from '../model/log-user-data.servicereq';
import { TokenBodyValid } from './validator/token-body.valid';
import { UserLogoutService } from '../service/logout/user-logout.service';
import { AccessTokenGuard } from './validator/access-token.guard';

@Controller('/auth/user')
export class AuthController {
    constructor(
        private readonly loginService: LoginService,
        private readonly userLogDataMapper: UserLogDataMapper,
        private readonly userLogoutService: UserLogoutService,
    ) {}

    @Post('/token')
    @UseGuards(AuthorizationGuard)
    async userLogin(@Headers('authorization') authorization: string, @Req() req: Request) {
        const credentials = Buffer.from(authorization.split(' ')[1], 'base64')
            .toString()
            .split(':');
        const username = credentials[0];
        const password = credentials[1];
        const logUserData: UserLogData = this.userLogDataMapper.convertToUserLogData(req);
        return await this.loginService.login(username, password, logUserData);
    }

    @Delete('/token')
    @UseGuards(AuthorizationGuard, AccessTokenGuard)
    async userLogout(
        @Headers('authorization') authorization: string,
        @Body() body: TokenBodyValid,
    ) {
        return this.userLogoutService.logout(body.refreshToken);
    }
}
