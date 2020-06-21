FROM node:alpine as builder

RUN mkdir server

WORKDIR /match

FROM builder As match

EXPOSE 5005

COPY package.json .

RUN npm install

COPY . .


CMD [ "npm", "start"]
