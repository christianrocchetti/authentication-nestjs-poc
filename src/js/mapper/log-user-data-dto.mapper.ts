import { plainToInstance } from 'class-transformer';
import { UserLogData } from '../model/log-user-data.servicereq';
import { UserLogDataDto } from '../model/user-log-data-dto';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserLogDataMapper {
    private readonly log: Logger = new Logger(UserLogDataMapper.name);

    constructor() {}

    convertToUserLogData(request: Request): UserLogData {
        const userLogDataDto = plainToInstance(UserLogData, request, {
            excludeExtraneousValues: true,
        });
        this.log.log(`convertToUserLogData executed, ip: ${userLogDataDto.ip}`);
        return userLogDataDto;
    }

    convertToUserLogDataDto(logUserData: UserLogData, username: string): UserLogDataDto {
        const logUserDataDTO = plainToInstance(UserLogDataDto, logUserData, {
            excludeExtraneousValues: true,
        });
        logUserDataDTO.username = username;
        this.log.log(`convertFromLogUserData executed, username: ${username}`);
        return logUserDataDTO;
    }
}
