package model

type User struct {
	ID                string `json:"id" gorm:"primaryKey;autoIncrement"`
	Email             string `json:"email" gorm:"type:varchar(255);uniqueIndex;not null"`
	FullName          string `json:"fullName" gorm:"type:varchar(255);not null"`
	Username          string `json:"username" gorm:"type:varchar(100);uniqueIndex;not null"`
	Password          string `json:"password" gorm:"type:varchar(255);not null"`
	PreferredCurrency string `json:"preferredCurrency" gorm:"type:varchar(3)"`
}
