variable "namespace" {
  type = string
  default = "k8s-proj-prod"
}

variable "app-front-host" {
  type = string
  default = "balticlegacy.ru"
}

variable "app-front-service-port" {
  type = number
  default = 3000
}

variable "app-back-host" {
  type = string
  default = "api.balticlegacy.ru"
}

variable "app-back-service-port" {
  type = number
  default = 4000
}
