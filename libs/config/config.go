package config

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
)

type Config struct {
	DOPPLER_CONFIG      string
	DOPPLER_ENVIRONMENT string
	DOPPLER_PROJECT     string
	TELEGRAM_API_HASH   string
	TELEGRAM_API_ID     int `json:",string"`
	POSTGRES_USER       string
	POSTGRES_PASSWORD   string
	POSTGRES_DB         string
	POSTGRES_HOST       string
	POSTGRES_PORT       int `json:",string"`
	KAFKA_BROKERS       string
}

func GetConfig() (config Config, err error) {
	currentWorkDirectory, _ := os.Getwd()
	absPath, _ := filepath.Abs(currentWorkDirectory + "/../../.env")
	err = godotenv.Load(absPath)
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	resp, err := http.Get("https://" + os.Getenv("DOPPLER_TOKEN") + "@api.doppler.com/v3/configs/config/secrets/download?format=json")

	if err != nil {
		fmt.Printf("Error on getting doppper secrets %+v\n", err)
		return
	}

	var parsedBody Config
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	json.Unmarshal(body, &parsedBody)

	return parsedBody, nil
}
