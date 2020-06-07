FROM node:alpine as builder

RUN mkdir setup

WORKDIR /setup

FROM builder As setup

EXPOSE 5006

COPY package.json .

RUN npm install

COPY . .


CMD [ "node", "server.js"]
