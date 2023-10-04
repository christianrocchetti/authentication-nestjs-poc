import { Injectable } from '@nestjs/common';
import { KeycloakRealm } from '../model/keycloak-realm.enum';
import keycloakConf from './keycloak';

@Injectable()
export class KeycloakFactoryConf {
    getConf(keycloakRealm: KeycloakRealm): KeycloakConf {
        switch (keycloakRealm) {
            case KeycloakRealm.MASTER:
                return {
                    clientId: keycloakConf().CLIENT_ID_ADMIN,
                    url: keycloakConf().URL_KEYCLOAK_REALM_MASTER,
                };
                break;
            case KeycloakRealm.USER:
                return {
                    clientId: keycloakConf().CLIENT_ID,
                    url: keycloakConf().URL_KEYCLOAK_REALM,
                };
                break;
        }
    }
}

export interface KeycloakConf {
    clientId: string;
    url: string;
}
