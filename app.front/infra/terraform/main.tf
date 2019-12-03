resource "kubernetes_deployment" "k8s-proj-front" {
  metadata {
    name = "k8s-proj-front"
    namespace = "k8s-proj-prod"
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
        namespace = "k8s-proj-prod"
        labels = {
          name = "k8s-proj-front"
        }
      }

      spec {
        container {
          image = "awesome1888/k8s_proj_front:1.0.0"
          name  = "k8s-proj-front"

          env {
            name = "NETWORK__HOST"
            value = ""
          }

          env {
            name = "NETWORK__PORT"
            value = "3000"
          }

          env {
            name = "NETWORK__CORS"
            value = ""
          }

          env {
            name = "API__URL"
            value = "https://api.k8s-proj.info"
          }
        }
      }
    }
  }
}

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
