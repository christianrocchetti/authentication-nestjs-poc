import { IsNotEmpty, Matches } from 'class-validator';

export class RegistrationBodyValid {
    @IsNotEmpty()
    @Matches('\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b', '', { message: 'invalid email' })
    email: string;
    @IsNotEmpty()
    @Matches('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*\\-_.]).{8,64})', '', {
        message:
            '- at least 8 characters ' +
            '- must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number ' +
            '- must contain special characters (#?!@$%^&*-_.)',
    })
    password: string;
}
