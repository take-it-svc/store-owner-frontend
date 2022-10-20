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
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage ./app/dist /usr/share/nginx/html
COPY web.conf /etc/nginx/conf.d/default.conf
COPY web.conf /etc/nginx/conf.d/web.conf
COPY --from=build-stage ./app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
#
#
##fire up nginx
#EXPOSE 80

