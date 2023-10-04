import { Expose } from 'class-transformer';

export class UserLogData {
    @Expose()
    ip: string;

    @Expose()
    headers: Headers;

    @Expose()
    body: string;

    @Expose()
    url: string;
}
