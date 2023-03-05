package dto

type userDto struct {
	Email           string      `json:"email"`
	Password        string      `json:"password"`
	Name            string      `json:"name"`
	Surname         string      `json:"surname"`
	TelegramAccount interface{} `json:"telegramAccount"`
	DeletedAt       int32       `json:"deletedAt"`
}

type CreateUserDto struct {
	userDto
}

type UpdateUserDto struct {
	Id string `json:"id"`
	userDto
}

type DeleteUserDto struct {
	Id        string `json:"id"`
	DeletedAt int32  `json:"deletedAt"`
}

type GetUserDto struct {
	Id string `json:"id"`
}

type GetUserBy struct {
	By string `json:"by"`
}
