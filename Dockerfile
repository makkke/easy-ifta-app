FROM node:6.3.0

RUN mkdir /app

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app/

CMD npm run bs

EXPOSE 80