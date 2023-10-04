import { Expose } from 'class-transformer';

export class UserLogDataDto {
    @Expose()
    username: string;

    @Expose()
    ip: string;

    @Expose()
    headers: Headers;

    @Expose()
    body: string;

    @Expose()
    url: string;

    @Expose()
    creationDate: Date;
}
