# todo: rename "k8s-proj" to "ingress"
resource "kubernetes_ingress" "k8s-proj" {
  metadata {
    name      = "k8s-proj"
    namespace = local.namespace
  }

  spec {
    //    backend {
    //      service_name = "k8s-proj-front"
    //      service_port = 3000
    //    }
    rule {
      host = local.app-front-host
      http {
        path {
          path = "/"
          backend {
            service_name = "k8s-proj-front" # todo: rename to "front"
            service_port = local.app-front-port
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
      host = local.app-back-host
      http {
        path {
          backend {
            service_name = "k8s-proj-back"
            service_port = local.app-back-port
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
      hosts       = local.hosts
      secret_name = "letsencrypt-certs"
    }
  }
}
