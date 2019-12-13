resource "kubernetes_job" "letsencrypt" {
  metadata {
    name = "letsencrypt"
    namespace = local.namespace
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
          name              = "letsencrypt"
          image             = "awesome1888/k8s-letsencrypt:latest"
          image_pull_policy = "Always"
          port {
            name            = "letsencrypt"
            container_port  = 80
          }
          env {
            name  = "DOMAINS"
            value = local.domains
          }
          env {
            name  = "EMAIL"
            value = "admin@email.com"
          }
          env {
            name  = "SECRET"
            value = "letsencrypt-certs"
          }
          env {
            name  = "STAGING"
            value = "1"
          }
        }
        restart_policy = "Never"
      }
    }
  }
}

resource "kubernetes_service" "letsencrypt" {
  metadata {
    name      = "letsencrypt"
    namespace = local.namespace
  }
  spec {
    selector = {
      name = "letsencrypt"
    }
    port {
      protocol  = "TCP"
      port      = 80
    }
  }
}

resource "kubernetes_secret" "letsencrypt" {
  metadata {
    name      = "letsencrypt-certs"
    namespace = local.namespace
  }

  type = "Opaque"
}

resource "kubernetes_role" "letsencrypt-certs-update" {
  metadata {
    name      = "letsencrypt-certs-update"
    namespace = local.namespace
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

# todo: rename to "letsencrypt-certs-update-to-sa"
resource "kubernetes_role_binding" "letsencrypt-certs-update" {
  metadata {
    name      = "letsencrypt-certs-update"
    namespace = local.namespace
  }
  role_ref {
    kind      = "Role"
    name      = "letsencrypt-certs-update"
    api_group = "rbac.authorization.k8s.io"
  }
  subject {
    kind      = "ServiceAccount"
    name      = "default"
    namespace = local.namespace
  }
}
