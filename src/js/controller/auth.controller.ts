import { Controller, Headers, Post, Req } from '@nestjs/common';
import { LoginService } from '../service/user-login.service';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthorizationGuard } from './validator/authorization.guard';
import { UserLogDataMapper } from '../mapper/log-user-data-dto.mapper';

@Controller('/auth/user')
export class AuthController {
    constructor(private readonly loginService: LoginService) {}

    @Post('/token')
    @UseGuards(AuthorizationGuard)
    async userLogin(@Headers('authorization') authorization: string, @Req() req: Request) {
        const credentials = Buffer.from(authorization.split(' ')[1], 'base64')
            .toString()
            .split(':');
        const username = credentials[0];
        const password = credentials[1];
        const logUserData = UserLogDataMapper.convertFromLogUserDataDTO(req);
        return await this.loginService.login(username, password, logUserData);
    }
}
