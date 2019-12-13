resource "kubernetes_service" "k8s-proj-front" {
  metadata {
    name = "k8s-proj-front" # todo: rename to "front" or "app.front"?
    namespace = var.namespace
  }
  spec {
    selector = {
      name = "k8s-proj-front" # todo: rename to "front" or "app.front"?
    }
    port {
      port = var.port
    }
  }
}
