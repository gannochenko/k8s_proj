#!/usr/bin/env bash

# usage:
# ./script/migrate.sh local

if [ $1 == "local" ]
then
    export NODE_ENV="development"
    export TYPEORM_URL="postgres://root:123@localhost:5432/k8s_proj"
else
    URL=
    USERNAME=
    PASSWORD=

    URL_PART=$(echo "${URL}" | sed -e "s/^postgres:\/\///")

    export TYPEORM_URL="postgres://${USERNAME}:${PASSWORD}@${URL_PART}"
fi

export TYPEORM_CONNECTION="postgres"
export TYPEORM_ENTITIES="src/model/*.ts"
export TYPEORM_MIGRATIONS="src/migrations/*-*.ts"
# export TYPEORM_MIGRATIONS_TABLE_NAME="migrations"

yarn run migrate
