package model

type Role struct {
	ID   string `json:"id" gorm:"type:uuid;primaryKey;default:uuid_generate_v4()"`
	Name string `json:"name"`
}
