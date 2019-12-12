resource "kubernetes_service" "k8s-proj-front" {
  metadata {
    name = "k8s-proj-front"
    namespace = "k8s-proj-prod"
  }
  spec {
    selector = {
      name = "k8s-proj-front"
    }
    port {
      port = 3000
    }
  }
}
