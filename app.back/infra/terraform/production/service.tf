resource "kubernetes_service" "k8s-proj-back" {
  metadata {
    name = "k8s-proj-back" # todo: rename to "app-back" or "app.back"?
    namespace = var.namespace
  }
  spec {
    selector = {
      name = "k8s-proj-back" # todo: rename to "app-back" or "app.back"?
    }
    port {
      port = var.port
    }
  }
}
