import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { ErrorResponse } from '../model/error.response';
import { HttpAdapterHost } from '@nestjs/core';
import { BaseException } from '../exception/base.exception';

import { CodeEnum } from '../model/code.enum';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    private readonly log = new Logger(AllExceptionFilter.name);

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: any, host: ArgumentsHost) {
        if (exception instanceof BaseException) {
            this.log.error(exception.error.stack);
        } else {
            this.log.error(exception.stack);
        }

        const httpStatus: HttpStatus =
            exception instanceof BaseException
                ? exception.status
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const codeEnum: CodeEnum =
            exception instanceof BaseException
                ? exception.codeEnum
                : CodeEnum.GENERIC_INTERNAL_ERROR;

        const errorResponse: ErrorResponse = new ErrorResponse(codeEnum);

        return this.httpAdapterHost.httpAdapter.reply(
            host.switchToHttp().getResponse(),
            errorResponse,
            httpStatus,
        );
    }
}
