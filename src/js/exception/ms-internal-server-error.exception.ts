import { BaseException } from './base.exception';
import { CodeEnum } from '../model/code.enum';
import { HttpStatus } from '@nestjs/common';

export class MsInternalServerErrorException extends BaseException {
    constructor(error: Error) {
        super(error, CodeEnum.GENERIC_INTERNAL_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
