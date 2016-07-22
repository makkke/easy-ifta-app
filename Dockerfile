FROM node:6.3.0

RUN adduser \
    --system --group \
    --disabled-password --disabled-login \
    --shell /bin/bash \
    lurtz

WORKDIR /home/frodo/app

COPY package.json /home/frodo/app
RUN npm install

COPY . /home/frodo/app/
RUN chown -R frodo:frodo /home/frodo

USER frodo

CMD npm run bs

EXPOSE 8080