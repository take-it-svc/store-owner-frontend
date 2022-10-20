#FROM node:lts-alpin
#COPY package*.json ./
#RUN npm install
#COPY . /app/
##CMD ["npm", "run", "serve"]
#
#RUN npm run build
#
##prepare nginx

#FROM node:lts-alpine as builder
#COPY package*.json ./
#RUN npm install

FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "serve"]

