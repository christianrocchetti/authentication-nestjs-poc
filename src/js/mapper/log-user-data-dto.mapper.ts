import { plainToInstance } from 'class-transformer';
import { UserLogData } from '../model/log-user-data.servicereq';
import { UserLogDataDto } from '../model/user-log-data-dto';

export class UserLogDataMapper {
    static convertFromLogUserDataDTO(logUserData: Request): UserLogDataDto {
        return plainToInstance(UserLogDataDto, logUserData, {
            excludeExtraneousValues: true,
        });
    }

    static convertFromLogUserData(logUserData: UserLogData, username: string): UserLogDataDto {
        const logUserDataDTO = plainToInstance(UserLogDataDto, logUserData, {
            excludeExtraneousValues: true,
        });
        logUserDataDTO.username = username;
        return logUserDataDTO;
    }
}
