import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { KeycloakFactoryConf } from '../property/keycloak-factory.conf';
import { UserGetTokenService } from './user-get-token-service';
import keycloakConf from '../property/keycloak';
import { KeycloakRealm } from '../model/keycloak-realm.enum';
import got from 'got';
import { UserTokenResponse } from '../model/user-token.response';

@Injectable()
export class RegistrationService {
    private readonly log = new Logger(RegistrationService.name);

    constructor(
        private readonly keycloakFactoryConf: KeycloakFactoryConf,
        private userGetTokenService: UserGetTokenService,
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
            const response = await got.post(keycloakConf().URL_KEYCLOAK_REALM_ADMIN + '/users', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${keycloakTokenResponse.accessToken}`,
                },
                body: data,
                responseType: 'json',
            });
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
