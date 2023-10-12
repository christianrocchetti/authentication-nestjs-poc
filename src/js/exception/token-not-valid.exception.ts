import { BaseException } from './base.exception';
import { CodeEnum } from '../model/code.enum';
import { HttpStatus } from '@nestjs/common';

export class TokenExpiredException extends BaseException {
    constructor(error: Error) {
        super(error, CodeEnum.TOKEN_EXPIRED, HttpStatus.UNAUTHORIZED);
    }
}
