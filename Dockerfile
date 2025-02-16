FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["sh", "-c", "PORT=${PORT} APP_URL=${APP_URL} DEFAULT_BANG=${DEFAULT_BANG} node server.js"]
