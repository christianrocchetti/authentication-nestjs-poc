import { BaseResponseInterface } from './base-response.interface';
import { CodeEnum } from './code.enum';

export class LogoutResponse implements BaseResponseInterface {
    code: number;
    message: string;
    response: any;

    constructor(response: any) {
        this.code = CodeEnum.LOGOUT.code;
        this.message = CodeEnum.LOGOUT.message;
        this.response = response;
    }
}
