module "app-back" {
  source = "../../../app.back/infra/terraform/production"

  namespace = local.namespace
  host = local.app-back-host
  port = local.app-back-port
}

module "app-front" {
  source = "../../../app.front/infra/terraform/production"

  namespace = local.namespace
  host = local.app-front-host
  port = local.app-front-port
}
