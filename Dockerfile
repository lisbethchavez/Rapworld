# Usamos una imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el contenido de tu proyecto al contenedor
COPY . /app

# Instalar las dependencias
RUN npm install

# Exponer el puerto en el que corre la API
EXPOSE 3002

# Comando para ejecutar la API
CMD ["npm", "start"]
