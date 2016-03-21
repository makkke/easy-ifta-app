FROM node:slim

ENV NPM_CONFIG_LOGLEVEL error
ENV NPM_CONFIG_REGISTRY http://registry.npmjs.org/

RUN mkdir /app
WORKDIR /app

COPY app/package.json .
RUN npm install --no-optional

COPY app \
     build-pipeline/build/entrypoint.sh \
     /app/

CMD bash entrypoint.sh

EXPOSE 80