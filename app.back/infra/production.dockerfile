FROM node:11
RUN apt-get update && apt-get install -y --no-install-recommends vim && apt-get clean

WORKDIR /app

ENV NODE_ENV=production

COPY ./build/ .
RUN yarn

EXPOSE 4000
CMD [ "yarn", "start" ]
