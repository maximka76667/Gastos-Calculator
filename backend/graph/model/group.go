package model

import "time"

type Group struct {
	ID        string    `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at" gorm:"default:CURRENT_TIMESTAMP()"`
}
