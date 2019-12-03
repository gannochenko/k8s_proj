provider "kubernetes" {}

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
    backend {
      service_name = "k8s-proj-back"
      service_port = 4000
    }

    //    rule {
    //      http {
    //        path {
    //          backend {
    //            service_name = "k8s-proj"
    //            service_port = 8080
    //          }
    //
    //          path = "/"
    //        }
    //      }
    //    }

    //    tls {
    //      secret_name = "tls-secret"
    //    }
  }
}

module "app-back" {
  source = "../../app.back/infra/terraform/"
}

module "app-front" {
  source = "../../app.front/infra/terraform/"
}
