FROM node:alpine as builder

RUN mkdir chart

WORKDIR /chart

FROM builder As chart

EXPOSE 4001

COPY package.json .

RUN npm install

COPY . .


CMD [ "npm", "start"]
