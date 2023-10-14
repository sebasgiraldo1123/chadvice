FROM node:20-alpine3.17

WORKDIR /app

COPY *.json ./
RUN npm i

COPY . .
    
EXPOSE 3000

CMD ["npm", "run", "dev"]