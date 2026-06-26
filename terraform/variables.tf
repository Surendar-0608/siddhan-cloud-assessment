variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "eu-north-1"
}

variable "ami_id" {
  description = "Ubuntu 22.04 AMI ID"
  type        = string
  default     = "ami-0c1ac8728ef5f3b78"
}

variable "key_name" {
  description = "EC2 Key Pair Name"
  type        = string
  default     = "siddhan-key"
}
