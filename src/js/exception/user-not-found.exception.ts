import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { CodeEnum } from '../model/code.enum';

export class NotFoundException extends BaseException {
    constructor(error: Error) {
        super(error, CodeEnum.USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);
    }
}
