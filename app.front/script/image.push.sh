#!/usr/bin/env bash

VENDOR="awesome1888"
APPLICATION_NAME="k8s_proj_front"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
VERSION="${1:-latest}"
TAG=${VENDOR}/${APPLICATION_NAME}:${VERSION}

docker build --no-cache -t ${TAG} -f infra/production.dockerfile .;
docker push ${TAG}
# docker rmi ${TAG}
