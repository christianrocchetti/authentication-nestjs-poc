import { BaseResponseInterface } from './base-response.interface';
import { CodeEnum } from './code.enum';

export class RefreshResponse implements BaseResponseInterface {
    code: number;
    message: string;
    response: any;

    constructor(response: any) {
        this.code = CodeEnum.REFRESH.code;
        this.message = CodeEnum.REFRESH.message;
        this.response = response;
    }
}
