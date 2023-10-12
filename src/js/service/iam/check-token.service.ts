import { Injectable, Logger } from '@nestjs/common';
import { KeycloakConf, KeycloakFactoryConf } from '../../property/keycloak-factory.conf';
import { HttpService } from '../http.service';
import { KeycloakRealm } from '../../model/keycloak-realm.enum';
import keycloakConf from '../../property/keycloak';
import { KeycloakIntrospectResponse } from '../../model/keycloak-introspect.response';
import { TokenExpiredException } from '../../exception/token-not-valid.exception';
import { MsInternalServerErrorException } from '../../exception/ms-internal-server-error.exception';

@Injectable()
export class CheckTokenService {
    private readonly log = new Logger(CheckTokenService.name);

    constructor(
        private readonly keycloakFactoryConf: KeycloakFactoryConf,
        private readonly httpService: HttpService,
    ) {}

    async checkToken(accessToken: string): Promise<void> {
        const keycloakRealm: KeycloakConf = this.keycloakFactoryConf.getConf(KeycloakRealm.USER);

        const data: URLSearchParams = new URLSearchParams({
            token: accessToken,
            client_id: keycloakRealm.clientId,
            client_secret: keycloakConf().CLIENT_SECRET,
        });

        const endpoint: string = `${keycloakRealm.url}/protocol/openid-connect/token/introspect`;

        try {
            const response: KeycloakIntrospectResponse = await this.httpService.makeRequest(
                endpoint,
                {
                    method: 'POST',
                    body: data.toString(),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                },
            );

            if (response.active === false) {
                throw new TokenExpiredException(new Error());
            }
        } catch (err) {
            if (err instanceof TokenExpiredException) {
                throw err;
            }
            throw new MsInternalServerErrorException(err);
        }
        return;
    }
}
