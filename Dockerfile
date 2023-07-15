
FROM node:18
WORKDIR /
RUN npm install
COPY . /


CMD ["npm", "start"]