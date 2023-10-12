import { IsNotEmpty } from 'class-validator';

export class TokenBodyValid {
    @IsNotEmpty()
    refreshToken: string;
}
