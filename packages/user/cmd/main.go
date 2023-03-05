package main

import "github.com/evgeshaDoc/go-telman/packages/user/internal/server"

func main() {
	server := server.New()

	server.Run()
}
