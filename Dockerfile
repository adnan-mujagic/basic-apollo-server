FROM node:current-alpine3.16
COPY . /app
WORKDIR /app
RUN npm install
CMD npm run start