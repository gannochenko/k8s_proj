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

resource "kubernetes_role" "letsencrypt-certs-update" {
  metadata {
    name = "letsencrypt-certs-update"
    namespace = "k8s-proj-prod"
    labels = {
      test = "letsencrypt-certs-update"
    }
  }

  rule {
    api_groups     = [""]
    resources      = ["secrets"]
    resource_names = ["letsencrypt-certs"]
    verbs          = ["patch", "post"]
  }
}

resource "kubernetes_role_binding" "letsencrypt-certs-update" {
  metadata {
    name      = "letsencrypt-certs-update"
    namespace = "k8s-proj-prod"
  }
  role_ref {
    kind      = "Role"
    name      = "letsencrypt-certs-update"
    api_group = "rbac.authorization.k8s.io"
  }
  subject {
    kind      = "ServiceAccount"
    name      = "default"
    namespace = "k8s-proj-prod"
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
        labels = {
          name = "letsencrypt"
        }
      }
      spec {
        automount_service_account_token = "true"

        container {
          name = "letsencrypt"
          image = "awesome1888/k8s-letsencrypt:latest"
          image_pull_policy = "Always"
          port {
            name = "letsencrypt"
            container_port = 80
          }
          env {
            name = "DOMAINS"
            value = "balticlegacy.ru"
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
