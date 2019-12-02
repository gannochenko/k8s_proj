FROM node:11
RUN apt-get update && apt-get install -y --no-install-recommends vim && apt-get clean
WORKDIR /app
RUN npm install webpack webpack-cli -g
CMD ["yarn", "run", "dev"]
