FROM node:11
RUN apt-get update && apt-get install -y --no-install-recommends vim && apt-get clean
#RUN useradd -ms /bin/bash vagrant
#USER vagrant
WORKDIR /app
CMD ["yarn", "run", "dev"]
