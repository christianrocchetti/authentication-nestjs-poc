import { Logger, Module } from "@nestjs/common";
import { AuthController } from "./controller/auth.controller";
import { LoginService } from "./service/user-login.service";
import { LoginLogDao } from "./service/login-log.dao";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import MongoConfig from "./property/mongo.conf";
import { UserLog, UserLogSchema } from "./schema/log.schema";
import { UserGetTokenService } from "./service/user-get-token-service";
import { AllExceptionFilter } from "./aop/error.handler";
import { KeycloakFactoryConf } from "./property/keycloak-factory.conf";
import * as path from "path";
import { APP_FILTER } from "@nestjs/core";
import { UserController } from "./controller/user.controller";
import { RegistrationService } from "./service/registration.service";
import { HttpExceptionFilter } from "./aop/error-not-found.handler";
import { UserLogDataMapper } from "./mapper/log-user-data-dto.mapper";
import { HttpService } from "./service/http.service";

const ENV: string = process.env.NODE_ENV;
const FILE_ENV: string = !ENV ? `.env` : `${ENV}.env`;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.normalize(`${process.cwd()}/src/env/${FILE_ENV}`),
      load: [MongoConfig]
    }),
    MongooseModule.forRoot(MongoConfig().URI_MONGO),
    MongooseModule.forFeature([{ name: UserLog.name, schema: UserLogSchema }])
  ],
  controllers: [AuthController, UserController],
  providers: [
    LoginService,
    UserGetTokenService,
    RegistrationService,
    LoginLogDao,
    KeycloakFactoryConf,
    UserLogDataMapper,
    HttpService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
export class AppModule {
  private readonly log = new Logger(AppModule.name);

  constructor() {
    this.log.log(`File env used: ${FILE_ENV}`);
  }
}
