# obtener una imagen docker de node
FROM node:alpine3.18 as build 
WORKDIR /code

# instalar los paquetes necesarios de la aplicacion
COPY package*.json /
RUN npm install

# copiar todos los archivos del programa al contenedor
# construir la imagen de produccion
COPY ./ /
RUN npm run build


# imagen del web service para levantar la aplicacion web
FROM nginx:1.25.4

# mover todas los archivos construidos a la carpeta del servidor
COPY --from=build /build /usr/share/nginx/html

# set up las configuraciones del servidor
COPY ./nginx.conf /etc/nginx/conf.d/default.conf