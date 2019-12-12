resource "kubernetes_ingress" "k8s-proj" {
  metadata {
    name = "k8s-proj"
    namespace = "k8s-proj-prod"
  }

  spec {
    //    backend {
    //      service_name = "k8s-proj-front"
    //      service_port = 3000
    //    }
    rule {
      host = "balticlegacy.ru"
      http {
        path {
          path = "/"
          backend {
            service_name = "k8s-proj-front"
            service_port = 3000
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
      host = "api.balticlegacy.ru"
      http {
        path {
          backend {
            service_name = "k8s-proj-back"
            service_port = 4000
          }
        }
      }
    }

    tls {
      hosts       = ["balticlegacy.ru", "api.balticlegacy.ru"]
      secret_name = "letsencrypt-certs"
    }
  }
}
