import { CodeEnum } from './code.enum';

export interface BaseResponseInterface {
    message: CodeEnum['_message'];
    code: CodeEnum['_code'];
    response?: any;
}
