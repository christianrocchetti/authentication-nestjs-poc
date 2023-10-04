import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorResponse } from '../model/error.response';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { CodeEnum } from '../model/code.enum';
import { HttpExceptionBody } from '@nestjs/common/interfaces/http/http-exception-body.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly log: Logger = new Logger(HttpExceptionFilter.name);

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        this.log.error(exception.stack);
        const responseBody: HttpExceptionBody = exception.getResponse() as HttpExceptionBody;
        const errorResponse: ErrorResponse = new ErrorResponse(
            CodeEnum.GENERIC_NESTJS_ERROR.code,
            responseBody.message as string,
        );
        return this.httpAdapterHost.httpAdapter.reply(
            host.switchToHttp().getResponse(),
            errorResponse,
            exception.getStatus(),
        );
    }
}
