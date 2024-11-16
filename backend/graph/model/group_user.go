package model

type GroupUser struct {
	UserId  string `json:"user_id" gorm:"primaryKey"`
	GroupId string `json:"group_id" gorm:"primaryKey"`
	RoleId  string `json:"role_id"`
}
