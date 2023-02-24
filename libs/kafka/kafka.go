package kafka

import (
	"strings"

	"github.com/evgeshaDoc/go-telman/libs/config"
	"github.com/segmentio/kafka-go"
)

const (
	USER string = "USER_QUEUE"
	AUTH string = "AUTH_QUEUE"
)

var localConfig, _ = config.GetConfig()
var KAFKA_BROKERS = strings.Split(localConfig.KAFKA_BROKERS, ",")

func KafkaWriterConfig(serviceName string) kafka.WriterConfig {
	writerConfig := kafka.WriterConfig{
		Brokers: KAFKA_BROKERS,
		Topic:   serviceName,
	}

	return writerConfig
}

func KafkaConsumerConfig(serviceName string) kafka.ReaderConfig {
	readerConfig := kafka.ReaderConfig{
		Brokers: KAFKA_BROKERS,
		Topic:   serviceName,
		GroupID: serviceName + "-group",
	}

	return readerConfig
}
