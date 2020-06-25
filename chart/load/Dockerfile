FROM node:alpine as builder

RUN mkdir load

WORKDIR /load

FROM builder As load

EXPOSE 3020 5001 5002 5003 5004 5005 5000

COPY package.json .

RUN npm install

COPY . .


CMD [ "npm", "start"]
