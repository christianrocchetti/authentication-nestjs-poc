import { IsNotEmpty } from 'class-validator';

export class RegistrationBodyValid {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}
