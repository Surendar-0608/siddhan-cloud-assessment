output "public_ip" {
  description = "EC2 Public IP"
  value       = aws_instance.devops_server.public_ip
}

output "dashboard_url" {
  description = "DevOps Dashboard URL"
  value       = "http://${aws_instance.devops_server.public_ip}"
}

output "prometheus_url" {
  description = "Prometheus URL"
  value       = "http://${aws_instance.devops_server.public_ip}:9090"
}

output "grafana_url" {
  description = "Grafana URL"
  value       = "http://${aws_instance.devops_server.public_ip}:3000"
}
