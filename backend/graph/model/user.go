package model

type User struct {
	ID                string   `json:"id"`
	Email             string   `json:"email"`
	FullName          string   `json:"fullName"`
	Username          string   `json:"username"`
	Password          string   `json:"password"`
	PreferredCurrency string   `json:"preferredCurrency"`
}