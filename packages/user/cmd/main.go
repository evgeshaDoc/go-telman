package main

import "github.com/evgeshaDoc/go-telman/packages/user/internal/server"

func main() {
	instance := server.New()

	instance.Run()
}
