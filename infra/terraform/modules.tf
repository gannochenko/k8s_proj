module "app-back" {
  source = "../../app.back/infra/terraform"

  namespace = local.namespace
  host = local.app-back-host
  port = local.app-back-port
}

module "app-front" {
  source = "../../app.front/infra/terraform"

  namespace = local.namespace
  host = local.app-front-host
  port = local.app-front-port
  api-url = "${local.proto}://${local.app-back-host}"
}
