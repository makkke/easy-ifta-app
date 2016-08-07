FROM node:6.3.1

ENV NPM_CONFIG_LOGLEVEL error

RUN mkdir /app
WORKDIR /app

COPY package.json /app/
RUN npm install

COPY . /app/
RUN npm run build

CMD npm start

EXPOSE 80

