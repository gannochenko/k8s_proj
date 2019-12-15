resource "kubernetes_deployment" "k8s-proj-front" {
  metadata {
    name = "k8s-proj-front"
    namespace = var.namespace
    labels = {
      name = "k8s-proj-front"
    }
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        name = "k8s-proj-front"
      }
    }

    template {
      metadata {
        namespace = var.namespace
        labels = {
          name = "k8s-proj-front"
        }
      }

      spec {
        container {
          image = "awesome1888/k8s_proj_front:${local.version}"
          name  = "k8s-proj-front"

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
            name = "API__URL"
            value = var.api-url
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
