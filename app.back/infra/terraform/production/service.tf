resource "kubernetes_service" "k8s-proj-back" {
  metadata {
    name = "k8s-proj-back"
    namespace = "k8s-proj-prod"
  }
  spec {
    selector = {
      name = "k8s-proj-back"
    }
    port {
      port = 4000
    }
  }
}
