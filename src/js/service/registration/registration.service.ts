import { Injectable, Logger } from '@nestjs/common';
import { BaseResponseInterface } from '../../model/base-response.interface';
import { RegistrationIamService } from '../iam/registration-iam.service';
import { RegistrationResponse } from '../../model/registration.response';

@Injectable()
export class RegistrationService {
    private readonly log = new Logger(RegistrationService.name);

    constructor(private readonly registrationIamService: RegistrationIamService) {}

    async register(email: string, password: string): Promise<BaseResponseInterface> {
        await this.registrationIamService.createUser(email, password);
        return new RegistrationResponse({});
    }
}
