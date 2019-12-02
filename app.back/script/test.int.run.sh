#!/usr/bin/env bash

# usage:
# ./script/test.int.run.sh dev
# to run tests in the development mode
# ./script/test.int.run.sh
# to run in cicd (like Jenkins)

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";

if [[ "${1}" == "dev" ]]
then
    YML="-f ${DIR}/../infra/int/composition.development.yml"
else
    YML="-f ${DIR}/../infra/int/composition.cicd.yml"
fi

docker stop $(docker ps -aq) > /dev/null 2> /dev/null;

if [[ "${1}" == "dev" ]]
then
    docker-compose ${YML} up -d --force-recreate --renew-anon-volumes;
    sleep 2s;
    yarn run test:int:watch;
else
    docker-compose ${YML} build --no-cache;
    docker-compose ${YML} up --abort-on-container-exit;
fi
