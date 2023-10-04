import { BaseResponseInterface } from './base-response.interface';
import { CodeEnum } from './code.enum';

export class ErrorResponse implements BaseResponseInterface {
    code: number;
    message: string;

    public constructor(codeEnum: CodeEnum);
    public constructor(code: number, message: string);

    constructor(...arr: any[]) {
        switch (arr.length) {
            case 1:
                this.code = arr[0].code;
                this.message = arr[0].message;
                break;
            case 2:
                this.code = arr[0];
                this.message = arr[1];
                break;
        }
    }
}
