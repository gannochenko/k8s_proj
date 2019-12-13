# todo: rename k8s_proj_prod to k8s-proj-prod
resource "kubernetes_namespace" "k8s_proj_prod" {
  metadata {
    annotations = {
      name = local.namespace
    }

    labels = {
      name = local.namespace
    }

    name = local.namespace
  }
}
