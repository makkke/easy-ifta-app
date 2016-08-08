FROM node:6.3.1

ENV NPM_CONFIG_LOGLEVEL error

RUN useradd --user-group --create-home --shell /bin/false lurtz
ENV HOME=/home/lurtz

COPY package.json $HOME/app/
RUN chown -R lurtz:lurtz $HOME/*

USER lurtz
WORKDIR $HOME/app
RUN npm install

USER root
COPY . $HOME/app/
RUN chown -R lurtz:lurtz $HOME/*
USER lurtz

CMD npm run bs

EXPOSE 8080