import { BaseResponseInterface } from './base-response.interface';
import { CodeEnum } from './code.enum';

export class RegistrationResponse implements BaseResponseInterface {
    code: number;
    message: string;
    response: any;

    constructor(response: any) {
        this.code = CodeEnum.REGISTRATION.code;
        this.message = CodeEnum.REGISTRATION.message;
        this.response = response;
    }
}
