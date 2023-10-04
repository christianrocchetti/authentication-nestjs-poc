# Authentication NestJs POC

## Description

This is my first app with [Nest](https://github.com/nestjs/nest) framework, this POC aims to expose a microservice in
which [OAuth](https://oauth.net/2/) is implemented with Keycloak and use MongoDB to save logs.

## Installation

```bash
$ npm install
```

## Running the app

### Local

If you doesn't use docker configuration, you can start the following commands:

```shell
# development
$ npm run start:dev # Dev use 'src/env/dev.env'

# production mode
$ npm run start:prod # Prod use 'src/env/.env'
```

### Docker

Instance uses dockerized Keycloak and MongoDB started via `docker compose -f src\docker up -d`.

## License

[MIT licensed](LICENSE).
