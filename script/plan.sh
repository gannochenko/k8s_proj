#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
ENV="${1:-prod}"

cd ${DIR}/../infra/terraform/;

if [[ ! -d ./.terraform ]]; then
    terraform init
    terraform get
fi

terraform plan -var="env=${ENV}" -state=./state/${ENV}/terraform.tfstate;
