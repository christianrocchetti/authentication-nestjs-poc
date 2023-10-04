import { HttpStatus } from '@nestjs/common';

import { CodeEnum } from '../model/code.enum';

export class BaseException extends Error {
    private readonly _codeEnum: CodeEnum;
    private readonly _status: HttpStatus;
    private readonly _error: Error;

    constructor(error: Error, codeEnum: CodeEnum, status: HttpStatus) {
        super(codeEnum.message);
        this._error = error;
        this._codeEnum = codeEnum;
        this._status = status;
    }

    get codeEnum(): CodeEnum {
        return this._codeEnum;
    }

    get status(): HttpStatus {
        return this._status;
    }

    get error(): Error {
        return this._error;
    }
}
