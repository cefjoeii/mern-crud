FROM node:latest

RUN mkdir -p /usr/src/app/react-src
WORKDIR /usr/src/app

RUN npm install -g nodemon

COPY package.json /usr/src/app/
RUN npm install

COPY react-src/package.json /usr/src/app/react-src
RUN npm install

COPY . /usr/src/app

EXPOSE 3000 4200
