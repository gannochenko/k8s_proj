module "app-back" {
  source = "../../../app.back/infra/terraform/production"
}

module "app-front" {
  source = "../../../app.front/infra/terraform/production"
}
