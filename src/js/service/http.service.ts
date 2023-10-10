import got from "got";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class HttpService {

  private readonly log = new Logger(HttpService.name);

  private got;

  constructor() {
    this.got = got.extend({
      hooks: {
        beforeRequest: [
          (options: any) => {
            this.log.log(`Http Request URL: ${options.method} ${options.url}, Headers: ${JSON.stringify(options.headers)}, Body: ${options.body}`);
          }
        ],
        afterResponse: [
          (response: any) => {
            this.log.log(`Http Response HttpCode: ${response.statusCode}, Body: ${response.body}`);
            return response;
          }
        ]
      }
    });
  }

  async makeRequest(url: string, options: any): Promise<any> {
    return this.got(url, options).json();
  }
}