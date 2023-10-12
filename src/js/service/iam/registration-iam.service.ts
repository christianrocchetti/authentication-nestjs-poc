import { Injectable, Logger } from '@nestjs/common';
import { KeycloakFactoryConf } from '../../property/keycloak-factory.conf';
import { UserGetTokenService } from './user-get-token-service';
import keycloakConf from '../../property/keycloak';
import { KeycloakRealm } from '../../model/keycloak-realm.enum';
import { UserTokenResponse } from '../../model/user-token.response';
import { HttpService } from '../http.service';
import { HTTPError } from 'got';
import { MsInternalServerErrorException } from '../../exception/ms-internal-server-error.exception';
import { AlreadyRegisteredUserException } from '../../exception/already-registered-user.exception';

@Injectable()
export class RegistrationIamService {
    private readonly log = new Logger(RegistrationIamService.name);

    constructor(
        private readonly keycloakFactoryConf: KeycloakFactoryConf,
        private readonly userGetTokenService: UserGetTokenService,
        private readonly httpService: HttpService,
    ) {}

    async createUser(email: string, password: string) {
        const keycloakTokenResponse: UserTokenResponse = await this.userGetTokenService.getToken(
            keycloakConf().KEYCLOAK_ADMIN_USERNAME,
            keycloakConf().KEYCLOAK_ADMIN_PASSWORD,
            KeycloakRealm.MASTER,
        );

        const data = JSON.stringify({
            id: 'c8807c1e-147a-4687-adde-0153bd6f901b',
            username: email,
            enabled: true,
            totp: false,
            emailVerified: true,
            firstName: 'firstTest',
            lastName: 'lastTest',
            email: email,
            disableableCredentialTypes: [],
            requiredActions: [],
            credentials: [
                {
                    temporary: false,
                    type: 'password',
                    value: password,
                },
            ],
        });

        try {
            const url: string = keycloakConf().URL_KEYCLOAK_REALM_ADMIN + '/users';
            await this.httpService.makeRequest(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${keycloakTokenResponse.accessToken}`,
                },
                body: data,
                responseType: 'json',
            });
        } catch (err) {
            if (err instanceof HTTPError && err.response.statusCode === 409) {
                throw new AlreadyRegisteredUserException(err);
            }
            throw new MsInternalServerErrorException(err);
        }
    }
}
