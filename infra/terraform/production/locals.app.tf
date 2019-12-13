locals {
  domains = join(",", [local.app-front-host, local.app-back-host])
  hosts = [local.app-front-host, local.app-back-host]
}

# todo: use data here?

locals {
  app-front-host = local.baseurl
  app-front-port = 3000
}

locals {
  app-back-host = "api.${local.baseurl}"
  app-back-port = 4000
}
