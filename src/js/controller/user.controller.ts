import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationBodyValid } from './validator/registration-body.valid';
import { RegistrationService } from '../service/registration/registration.service';

@Controller('/user')
export class UserController {
    constructor(private readonly registrationService: RegistrationService) {}

    @Post('/registration')
    async userLogin(@Body() body: RegistrationBodyValid) {
        return await this.registrationService.register(body.email, body.password);
    }
}
