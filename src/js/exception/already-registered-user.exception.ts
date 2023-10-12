import { BaseException } from './base.exception';
import { CodeEnum } from '../model/code.enum';
import { HttpStatus } from '@nestjs/common';

export class AlreadyRegisteredUserException extends BaseException {
    constructor(error: Error) {
        super(error, CodeEnum.ALREADY_REGISTERED_USER, HttpStatus.CONFLICT);
    }
}
