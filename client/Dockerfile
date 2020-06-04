FROM node:alpine as builder

RUN mkdir server

WORKDIR /client

FROM builder As fileserver

EXPOSE 3000

COPY package.json .

RUN npm install

COPY . .


CMD [ "npm", "start"]