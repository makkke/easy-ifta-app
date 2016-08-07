FROM node:6.3.1

RUN mkdir /app
WORKDIR /app

COPY package.json /app/
RUN npm install

COPY . /app/
RUN npm run build

CMD npm start

EXPOSE 80

