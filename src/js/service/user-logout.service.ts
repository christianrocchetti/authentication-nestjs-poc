import { Injectable, Logger } from "@nestjs/common";
import { BaseResponseInterface } from "../model/base-response.interface";
import { UserLogDataDto } from "../model/user-log-data-dto";
import { UserLogDataMapper } from "../mapper/log-user-data-dto.mapper";
import { UserTokenResponse } from "../model/user-token.response";
import { KeycloakRealm } from "../model/keycloak-realm.enum";
import { LoginResponse } from "../model/login.response";

@Injectable()
export class UserLogoutService {
  private readonly log = new Logger(UserLogoutService.name);
    /*  constructor(
    private readonly loginLogDao: LoginLogDao,
    private readonly userGetTokenService: UserGetTokenService,
  ) {}*/

  async logout(
    accessToken: string,
  ): Promise<BaseResponseInterface> {
    return null;
  }
}
