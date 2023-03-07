package server

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"time"

	"github.com/evgeshaDoc/go-telman/libs/config"
	kafkaConfig "github.com/evgeshaDoc/go-telman/libs/kafka"
	"github.com/segmentio/kafka-go"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Server struct {
	authReader *kafka.Reader
	userWriter *kafka.Writer
	userReader *kafka.Reader
	db         *gorm.DB
}

func New() *Server {
	return &Server{}
}

func (s *Server) Run() {
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
	userWriter := kafka.NewWriter(kafkaConfig.KafkaWriterConfig(kafkaConfig.USER + ".req"))
	userReader := kafka.NewReader(kafkaConfig.KafkaConsumerConfig(kafkaConfig.USER))

	s.authReader = authReader
	s.userWriter = userWriter
	s.userReader = userReader
	s.db = dbConn

	fmt.Println("Running user server")
	defer s.authReader.Close()
	defer s.userWriter.Close()
	defer func() {
		sqlConn, _ := s.db.DB()
		_ = sqlConn.Close()
	}()

	errChan := make(chan os.Signal, 1)

	signal.Notify(errChan, os.Interrupt, os.Interrupt)

	go s.listenToMessages()

	<-errChan

	_, shutdown := context.WithTimeout(context.Background(), 5*time.Second)
	defer shutdown()

	fmt.Println("Shutting down server...")

	return
}

func (s *Server) listenToMessages() {
	go func() {
		for {
			message, err := s.authReader.ReadMessage(context.Background())
			if err != nil {
				fmt.Errorf("error on reading message: %+v", err)
				continue
			}
			go authHandler(message, s.db)
		}
	}()

	go func() {
		for {
			message, err := s.userReader.ReadMessage(context.Background())
			if err != nil {
				fmt.Errorf("error on reading message: %+v", err)
				continue
			}
			fmt.Printf("Incoming user topic message: %+v", message)
		}
	}()
}
