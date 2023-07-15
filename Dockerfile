
FROM node:18
WORKDIR /
RUN npm install


CMD ["npm", "start"]