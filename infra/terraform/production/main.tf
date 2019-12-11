provider "kubernetes" {}

# todo: rename k8s_proj_prod to k8s-proj-prod
resource "kubernetes_namespace" "k8s_proj_prod" {
  metadata {
    annotations = {
      name = "k8s-proj-prod"
    }

    labels = {
      name = "k8s-proj-prod"
    }

    name = "k8s-proj-prod"
  }
}

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
      host = "api.kreuz39.ru"
      http {
        path {
          backend {
            service_name = "k8s-proj-back"
            service_port = 4000
          }
        }
      }
    }

    rule {
      host = "kreuz39.ru"
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

    tls {
      hosts = ["kreuz39.ru"]
      secret_name = "letsencrypt-certs"
    }
  }
}

resource "kubernetes_job" "letsencrypt" {
  metadata {
    name = "letsencrypt"
    namespace = "k8s-proj-prod"
    labels = {
      name = "letsencrypt"
    }
  }
  spec {
    template {
      metadata {
        name = "letsencrypt"
//        namespace = "k8s-proj-prod"
        labels = {
          name = "letsencrypt"
        }
      }
      spec {
        container {
          name = "letsencrypt"
          image = "quay.io/hiphipjorge/kube-nginx-letsencrypt:latest"
          image_pull_policy = "Always"
          port {
            name = "letsencrypt"
            container_port = 80
          }
          env {
            name = "DOMAINS"
            value = "kreuz39.ru"
          }
          env {
            name = "EMAIL"
            value = "admin@email.com"
          }
          env {
            name = "SECRET"
            value = "letsencrypt-certs"
          }
        }
        restart_policy = "Never"
      }
    }
  }
}

resource "kubernetes_service" "letsencrypt" {
  metadata {
    name = "letsencrypt"
    namespace = "k8s-proj-prod"
  }
  spec {
    selector = {
      name = "letsencrypt"
    }
    port {
      protocol = "TCP"
      port = 80
    }
  }
}

resource "kubernetes_secret" "letsencrypt" {
  metadata {
    name = "letsencrypt-certs"
    namespace = "k8s-proj-prod"
  }

  type = "Opaque"
}

module "app-back" {
  source = "../../../app.back/infra/terraform/production"
}

module "app-front" {
  source = "../../../app.front/infra/terraform/production"
}
