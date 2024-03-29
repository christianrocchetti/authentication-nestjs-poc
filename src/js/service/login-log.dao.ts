import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserLogDataDto } from '../model/user-log-data-dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserLog } from '../schema/log.schema';

@Injectable()
export class LoginLogDao {
    private readonly log = new Logger(LoginLogDao.name);

    constructor(@InjectModel(UserLog.name) private userLogModel: Model<UserLog>) {}

    async saveLog(userLogDataDTO: UserLogDataDto) {
        const userLog = new this.userLogModel(userLogDataDTO);
        this.log.log(`save log for username ${userLog.username}`);
        return userLog.save();
    }
}
