resource "kubernetes_deployment" "k8s-proj-back" {
  metadata {
    name = "k8s-proj-back"
    namespace = var.namespace
    labels = {
      name = "k8s-proj-back"
    }
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        name = "k8s-proj-back"
      }
    }

    template {
      metadata {
        namespace = var.namespace
        labels = {
          name = "k8s-proj-back"
        }
      }

      spec {
        container {
          image = "awesome1888/k8s_proj_back:${local.version}"
          name  = "k8s-proj-back"

          env {
            name = "NETWORK__HOST"
            value = var.host
          }

          env {
            name = "NETWORK__PORT"
            value = var.port
          }

          env {
            name = "NETWORK__CORS"
            value = ""
          }

          env {
            name = "DATABASE__URL"
            value = ""
          }

          liveness_probe {
            http_get {
              path = "/health"
              port = var.port
            }

            initial_delay_seconds = 3
            period_seconds        = 3
          }
        }
      }
    }
  }
}
