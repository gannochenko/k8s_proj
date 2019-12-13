#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";


cd ${DIR}/../infra/terraform/;

if [[ ! -d ./.terraform ]]; then
    terraform init
    terraform get
fi

terraform apply -auto-approve -var="env=${ENV}" -state=./state/${ENV}/terraform.tfstate -state-out=./state/${ENV}/terraform.tfstate;
