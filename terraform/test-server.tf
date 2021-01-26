module "test-server"{
    source = "./node-server"

    ami-id = "ami-022082b7f1da62478"
    key-pair = aws_key_pair.microservices-demo-key.key_name
    name = "Test server"
}