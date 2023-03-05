package server

import (
	"context"
	"fmt"

	"github.com/evgeshaDoc/go-telman/libs/config"
	kafkaConfig "github.com/evgeshaDoc/go-telman/libs/kafka"
	"github.com/segmentio/kafka-go"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Server struct {
	authReader *kafka.Reader
	userWriter *kafka.Writer
	db         *gorm.DB
}

func New() Server {
	localConfig, err := config.GetConfig()

	if err != nil {
		fmt.Errorf("error getting config: %+v", err)
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d",
		localConfig.POSTGRES_HOST,
		localConfig.POSTGRES_USER,
		localConfig.POSTGRES_PASSWORD,
		localConfig.POSTGRES_DB,
		localConfig.POSTGRES_PORT,
	)

	dbConn, err := gorm.Open(postgres.New(postgres.Config{DSN: dsn}))

	if err != nil {
		fmt.Errorf("error connecting to db %+v", err)
	}

	authReader := kafka.NewReader(kafkaConfig.KafkaConsumerConfig(kafkaConfig.AUTH))
	userWriter := kafka.NewWriter(kafkaConfig.KafkaWriterConfig(kafkaConfig.USER))

	server := Server{
		authReader: authReader,
		userWriter: userWriter,
		db:         dbConn,
	}

	return server
}

func (s *Server) Run() {
	defer s.authReader.Close()
	defer s.userWriter.Close()
	defer func() {
		sqlConn, _ := s.db.DB()
		_ = sqlConn.Close()
	}()

	go (func() {
		for {
			message, err := s.authReader.ReadMessage(context.Background())
			if err != nil {
				fmt.Errorf("error on reading message: %+v", err)
				continue
			}
			go authHandler(message, s.db)
		}
	})()

}
