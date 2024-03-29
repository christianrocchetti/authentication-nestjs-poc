import keycloakConf from '../property/keycloak';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import got, { HTTPError } from 'got';
import { plainToInstance } from 'class-transformer';
import { UserTokenResponse } from '../model/user-token.response';
import { KeycloakConf, KeycloakFactoryConf } from '../property/keycloak-factory.conf';
import { KeycloakRealm } from '../model/keycloak-realm.enum';
import { NotFoundException } from '../exception/user-not-found.exception';
import { KeycloakTokenResponse } from "../model/keycloak-token.response";

@Injectable()
export class UserGetTokenService {
    private readonly log: Logger = new Logger(UserGetTokenService.name);

    constructor(private readonly keycloakFactoryConf: KeycloakFactoryConf) {}

    public async getToken(
        username: string,
        password: string,
        realm: KeycloakRealm,
    ): Promise<UserTokenResponse> {
        const keycloakRealm: KeycloakConf = this.keycloakFactoryConf.getConf(realm);

        const data: URLSearchParams = new URLSearchParams({
            grant_type: 'password',
            username: username,
            password: password,
            client_id: keycloakRealm.clientId,
            client_secret: keycloakConf().CLIENT_SECRET,
        });

        const endpoint: string = `${keycloakRealm.url}/protocol/openid-connect/token`;

        try {
            const response: KeycloakTokenResponse = await got
                .post(endpoint, {
                    body: data.toString(),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                .json();
            const userTokenResponse: UserTokenResponse = plainToInstance(
                UserTokenResponse,
                response,
                {
                    excludeExtraneousValues: true,
                },
            );
            return userTokenResponse;
        } catch (err) {
            if (err instanceof HTTPError && err.response.statusCode === 401) {
                throw new NotFoundException(err);
            }
            throw new InternalServerErrorException(err);
        }
    }
}
