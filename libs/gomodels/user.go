package gomodels

import "time"

type User struct {
	Id              string    `gorm:"primary_key;column:id;type:TEXT" json:"id"`
	Email           string    `gorm:"column:email;type:TEXT" json:"email"`
	Password        string    `gorm:"column:password;type:TEXT" json:"password"`
	Name            string    `gorm:"column:name;type:TEXT" json:"name"`
	Surname         string    `gorm:"column:surname;type:TEXT" json:"surname"`
	TelegramAccount string    `gorm:"column:telegram_account;type:TEXT" json:"telegramAccount"`
	CreatedAt       time.Time `gorm:"column:created_at;type:timestamp" json:"createdAt"`
	UpdatedAt       time.Time `gorm:"column:updated_at;type:timestamp" json:"updatedAt"`
	DeletedAt       int32     `gorm:"column:deleted_at;type:int" json:"deletedAt"`
}

func (u *User) TableName() string {
	return "user"
}
