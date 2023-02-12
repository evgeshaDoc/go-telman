package main

import (
	"fmt"

	globalConfig "github.com/evgeshaDoc/go-telman/libs/config"
	"github.com/gotd/td/telegram"
)

func main() {
	config, err := globalConfig.GetConfig()
	if err != nil {
		fmt.Printf("%+v", err)
	}

	client := telegram.NewClient(config.TELEGRAM_API_ID, config.TELEGRAM_API_HASH, telegram.Options{})

}
