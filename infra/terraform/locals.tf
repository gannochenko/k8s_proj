locals {
  namespace = "k8s-proj-${var.env}"
  urlpx = var.env == "prod" ? "" : "-${var.env}"
  baseurl = "balticlegacy${local.urlpx}.ru"
  proto = var.env == "prod" ? "https" : "http"
}
