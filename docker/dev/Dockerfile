FROM node:20-alpine
LABEL maintainer="https://github.com/temitopeAdeyemo"

WORKDIR /app

RUN apk add --no-cache bash
RUN apk add iputils-ping
RUN apk add busybox-extras
RUN apk add sudo

COPY --chown=node:node package**.json ./

RUN npm install -g typescript

RUN npm install

EXPOSE 3000

COPY --chown=node:node . .

COPY /docker/dev/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

USER node

# RUN apk --update add vim nano

ENTRYPOINT ["/entrypoint.sh"]