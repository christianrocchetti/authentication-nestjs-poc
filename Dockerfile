FROM node:18.17.1
WORKDIR /usr/app
COPY ./package.json ./package.json
RUN npm install
COPY . .
CMD npm start prod
