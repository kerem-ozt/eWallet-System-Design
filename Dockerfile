FROM node:latest
WORKDIR /usr/src/app
COPY . .
COPY package*.json ./
RUN npm install
EXPOSE 3001
CMD ["npm", "start"]
