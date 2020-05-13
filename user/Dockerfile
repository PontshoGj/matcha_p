FROM node:alpine as builder

RUN mkdir server

WORKDIR /server

FROM builder As usermanagement

EXPOSE 5001

COPY package.json .

RUN npm install

COPY . .


CMD [ "node", "user.js"]
