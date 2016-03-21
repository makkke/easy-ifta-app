FROM node:slim

ENV NPM_CONFIG_LOGLEVEL error
ENV NPM_CONFIG_REGISTRY http://registry.npmjs.org/

# setting up directory structure for the node.js app
RUN mkdir /app
WORKDIR /app

# download nc for connectivity check
RUN apt-get update && apt-get install -y netcat

# download all dependencies
COPY app \
     build-pipeline/build/entrypoint.sh \
     /app/

RUN npm install --no-optional

CMD npm run bs

EXPOSE 80