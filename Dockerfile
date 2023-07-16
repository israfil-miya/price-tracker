FROM node:latest
WORKDIR /
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
