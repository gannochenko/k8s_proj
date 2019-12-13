resource "kubernetes_namespace" "k8s-proj-prod" {
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

resource "kubernetes_namespace" "k8s-proj-staging" {
  metadata {
    annotations = {
      name = "k8s-proj-staging"
    }

    labels = {
      name = "k8s-proj-staging"
    }

    name = "k8s-proj-staging"
  }
}
