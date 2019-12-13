#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
ENV="${1:-prod}"

cd ${DIR}/../infra/terraform/;

terraform plan -var="env=${ENV}" -state=./${ENV}/terraform.fstate;
