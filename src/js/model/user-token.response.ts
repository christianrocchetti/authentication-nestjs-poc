import { Expose } from 'class-transformer';

export class UserTokenResponse {
    @Expose({ name: 'access_token' })
    accessToken: string;
    @Expose({ name: 'expires_in' })
    expiresIn: number;
    @Expose({ name: 'refresh_expires_in' })
    refreshExpiresIn: number;
    @Expose({ name: 'refresh_token' })
    refreshToken: string;
    @Expose({ name: 'token_type' })
    tokenType: string;
    @Expose({ name: 'not-before-policy' })
    notBeforePolicy: number;
    @Expose({ name: 'session_state' })
    sessionState: string;
    @Expose()
    scope: string;
}
