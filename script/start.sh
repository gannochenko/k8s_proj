#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";

REBUILD=""
if [[ $1 = "-r" ]]; then
  REBUILD="--build"
fi

docker stop $(docker ps -aq) > /dev/null;
docker-compose -f ${DIR}/../infra/development.yml up ${REBUILD};
