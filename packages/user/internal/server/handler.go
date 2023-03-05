package server

import (
	"encoding/json"
	"fmt"

	"github.com/evgeshaDoc/go-telman/libs/gomodels"
	"github.com/evgeshaDoc/go-telman/packages/user/internal/server/dto"
	"github.com/segmentio/kafka-go"
	"gorm.io/gorm"
)

func authHandler(message kafka.Message, db *gorm.DB) {
	var messageValue interface{}
	json.Unmarshal(message.Value, &messageValue)

	switch message.Topic {
	case "createUser":
		createUserDto, _ := messageValue.(dto.CreateUserDto)
		err := createUser(db, createUserDto)
		if err != nil {
			//some action
			fmt.Println("handle create error")
		}
	case "getOneUser":
		getUserDto, _ := messageValue.(dto.GetUserDto)
		getUser(db, getUserDto)
	case "getUserBy":
		getUserByDto, _ := messageValue.(dto.GetUserBy)
		getUserBy(db, getUserByDto)
	case "updateUser":
		updateUserDto, _ := messageValue.(dto.UpdateUserDto)
		updateUser(db, updateUserDto)
	case "deleteUser":
		deleteUserDto, _ := messageValue.(dto.DeleteUserDto)
		deleteUser(db, deleteUserDto)
	}
}

func createUser(db *gorm.DB, dto dto.CreateUserDto) error {
	user := gomodels.User{Email: dto.Email, Password: dto.Password, Name: dto.Name, Surname: dto.Surname}
	res := db.Create(&user).Error

	if res != nil {
		fmt.Errorf("error while inserting user: %+v", res)
		return res
	}

	return nil
}

func updateUser(db *gorm.DB, dto dto.UpdateUserDto) {
}

func deleteUser(db *gorm.DB, dto dto.DeleteUserDto) {
}

func getUser(db *gorm.DB, dto dto.GetUserDto) {
}

func getUserBy(db *gorm.DB, dto dto.GetUserBy) {
}
