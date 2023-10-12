import { Injectable, Logger } from '@nestjs/common';
import { UserLogData } from '../../model/log-user-data.servicereq';
import { LoginLogDao } from '../dao/login-log.dao';
import { UserLogDataMapper } from '../../mapper/log-user-data-dto.mapper';
import { UserGetTokenService } from '../iam/user-get-token-service';
import { LoginResponse } from '../../model/login.response';
import { BaseResponseInterface } from '../../model/base-response.interface';
import { UserTokenResponse } from '../../model/user-token.response';
import { KeycloakRealm } from '../../model/keycloak-realm.enum';
import { UserLogDataDto } from '../../model/user-log-data-dto';

@Injectable()
export class LoginService {
    private readonly log = new Logger(LoginService.name);

    constructor(
        private readonly loginLogDao: LoginLogDao,
        private readonly userGetTokenService: UserGetTokenService,
        private readonly userLogDataMapper: UserLogDataMapper,
    ) {}

    async login(
        username: string,
        password: string,
        logUserData: UserLogData,
    ): Promise<BaseResponseInterface> {
        const logUserDataDTO: UserLogDataDto = this.userLogDataMapper.convertToUserLogDataDto(
            logUserData,
            username,
        );
        await this.loginLogDao.saveLog(logUserDataDTO);
        const keycloakTokenResponse: UserTokenResponse = await this.userGetTokenService.getToken(
            username,
            password,
            KeycloakRealm.USER,
        );
        return new LoginResponse(keycloakTokenResponse);
    }
}
