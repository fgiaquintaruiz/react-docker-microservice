resource "aws_s3_bucket" "deploy-bucket" {
    bucket = "fggr-microservices-demo-${var.app-name}-deployment"
}

