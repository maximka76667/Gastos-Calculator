package model

import "time"

type Expense struct {
	ID           string    `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	UserId       string    `json:"user"`
	GroupId      string    `json:"group"`
	Amount       float64   `json:"amount"`
	IsMain       bool      `json:"isMain"`
	Name         string    `json:"name"`
	CurrencyCode string    `json:"currencyCode"`
	LastModified time.Time `json:"lastModified" gorm:"autoUpdateTime"`
}
