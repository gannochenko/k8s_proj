#!/usr/bin/env bash

VENDOR="awesome1888"
APPLICATION_NAME="k8s_proj_back"
PORT="4000"

# this script runs a standalone image created with script/image.build.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
VERSION="${1:-latest}"
TAG=${VENDOR}/${APPLICATION_NAME}:${VERSION}

echo Running ${TAG} image;

docker run -d -p ${PORT}:${PORT} ${TAG}
