package config

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"reflect"

	"github.com/joho/godotenv"
)

type Config struct {
	DOPPLER_CONFIG      string
	DOPPLER_ENVIRONMENT string
	DOPPLER_PROJECT     string
	TELEGRAM_API_HASH   string
	TELEGRAM_API_ID     string
}

func setField(obj interface{}, name string, value interface{}) error {
	structValue := reflect.ValueOf(obj).Elem()
	structFieldValue := structValue.FieldByName(name)

	if !structFieldValue.IsValid() {
		return fmt.Errorf("no such field: %s in obj", name)
	}

	if !structFieldValue.CanSet() {
		return fmt.Errorf("cannot set %s field value", name)
	}

	structFieldType := structFieldValue.Type()
	val := reflect.ValueOf(value)
	if structFieldType != val.Type() {
		return errors.New("provided value type didn't match obj field type")
	}

	structFieldValue.Set(val)
	return nil
}

func (c *Config) fillStruct(m map[string]interface{}) error {
	for k, v := range m {
		err := setField(c, k, v)
		if err != nil {
			return err
		}
	}
	return nil
}

func GetConfig() (config Config, err error) {
	err = godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	fmt.Println(os.Getenv("DOPPLER_TOKEN"))
	resp, err := http.Get("https://" + os.Getenv("DOPPLER_TOKEN") + "@api.doppler.com/v3/configs/config/secrets/download?format=json")

	if err != nil {
		fmt.Printf("Error on getting doppper secrets %+v\n", err)
		return
	}

	var parsedBody map[string]interface{}
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	json.Unmarshal(body, &parsedBody)

	fmt.Println(parsedBody)
	config = Config{}
	err = config.fillStruct(parsedBody)
	if err != nil {
		fmt.Printf("Error on filling config struct: %+v\n", err)
		return
	}

	fmt.Printf("%+v", config)
	return config, nil
}
