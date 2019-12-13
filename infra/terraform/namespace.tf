resource "kubernetes_namespace" "k8s-proj-${local.namespace}" {
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
