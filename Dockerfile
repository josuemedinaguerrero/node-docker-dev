# Usar la imagen oficial de Node.js
FROM node:20.18.1

# Crear y definir el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de la aplicación
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto en el que la app escucha
EXPOSE 3000

# Comando para correr la aplicación
CMD ["npm", "run", "dev"]
