resource "kubernetes_ingress" "k8s-proj" {
  metadata {
    name      = "k8s-proj"
    namespace = var.namespace
  }

  spec {
    //    backend {
    //      service_name = "k8s-proj-front"
    //      service_port = 3000
    //    }
    rule {
      host = var.app-front-host
      http {
        path {
          path = "/"
          backend {
            service_name = "k8s-proj-front"
            service_port = var.app-front-service-port
          }
        }
        path {
          path = "/.well-known"
          backend {
            service_name = "letsencrypt"
            service_port = 80
          }
        }
      }
    }

    rule {
      host = var.app-back-host
      http {
        path {
          backend {
            service_name = "k8s-proj-back"
            service_port = var.app-back-service-port
          }
        }
        path {
          path = "/.well-known"
          backend {
            service_name = "letsencrypt"
            service_port = 80
          }
        }
      }
    }

    tls {
      hosts       = [var.app-front-host, var.app-back-host]
      secret_name = "letsencrypt-certs"
    }
  }
}
