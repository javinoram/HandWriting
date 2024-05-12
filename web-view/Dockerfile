# obtener una imagen docker de node
FROM node:alpine3.18 as build 
WORKDIR /code
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.25.0-alpine as production
COPY --from=build /code/build /usr/share/nginx/html
COPY --from=build code/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]