import { BaseResponseInterface } from './base-response.interface';
import { CodeEnum } from './code.enum';

export class LoginResponse implements BaseResponseInterface {
    code: number;
    message: string;
    response: any;

    constructor(response: any) {
        this.code = CodeEnum.LOGIN.code;
        this.message = CodeEnum.LOGIN.message;
        this.response = response;
    }
}
