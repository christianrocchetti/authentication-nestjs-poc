export default () => ({
    URL_KEYCLOAK_REALM: process.env.URL_KEYCLOAK_REALM as string,
    CLIENT_SECRET: process.env.CLIENT_SECRET as string,
    CLIENT_ID: process.env.CLIENT_ID as string,
    URL_KEYCLOAK_REALM_MASTER: process.env.URL_KEYCLOAK_REALM_MASTER as string,
    URL_KEYCLOAK_REALM_ADMIN: process.env.URL_KEYCLOAK_REALM_ADMIN as string,
    CLIENT_ID_ADMIN: process.env.CLIENT_ID_ADMIN as string,
    KEYCLOAK_ADMIN_USERNAME: process.env.KEYCLOAK_ADMIN_USERNAME as string,
    KEYCLOAK_ADMIN_PASSWORD: process.env.KEYCLOAK_ADMIN_PASSWORD as string,
});
