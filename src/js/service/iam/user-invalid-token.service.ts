import { Injectable, Logger } from '@nestjs/common';
import { KeycloakConf, KeycloakFactoryConf } from '../../property/keycloak-factory.conf';
import { HttpService } from '../http.service';
import { KeycloakRealm } from '../../model/keycloak-realm.enum';
import keycloakConf from '../../property/keycloak';
import { HTTPError } from 'got';
import { TokenExpiredException } from '../../exception/token-not-valid.exception';
import { MsInternalServerErrorException } from '../../exception/ms-internal-server-error.exception';

@Injectable()
export class UserInvalidTokenService {
    private readonly log = new Logger(UserInvalidTokenService.name);

    constructor(
        private readonly keycloakFactoryConf: KeycloakFactoryConf,
        private readonly httpService: HttpService,
    ) {}

    async invalidToken(refreshToken: string): Promise<void> {
        const keycloakRealm: KeycloakConf = this.keycloakFactoryConf.getConf(KeycloakRealm.USER);

        const data: URLSearchParams = new URLSearchParams({
            refresh_token: refreshToken,
            client_id: keycloakRealm.clientId,
            client_secret: keycloakConf().CLIENT_SECRET,
        });

        const endpoint: string = `${keycloakRealm.url}/protocol/openid-connect/logout`;

        try {
            await this.httpService.makeRequest(endpoint, {
                method: 'POST',
                body: data.toString(),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
        } catch (err) {
            if (err instanceof HTTPError && err.response.statusCode === 400) {
                throw new TokenExpiredException(err);
            }
            throw new MsInternalServerErrorException(err);
        }
    }
}
