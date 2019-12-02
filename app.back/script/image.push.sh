#!/usr/bin/env bash

VENDOR="awesome1888"
APPLICATION_NAME="k8s_proj_back"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
VERSION="${1:-latest}"

docker build -t ${VENDOR}/${APPLICATION_NAME}:${VERSION} -f infra/production.dockerfile .;
docker push ${VENDOR}/${APPLICATION_NAME}:${VERSION}
# docker rmi ${VENDOR}/${APPLICATION_NAME}:${VERSION}
