FROM node:18
WORKDIR /
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
