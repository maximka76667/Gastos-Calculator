package helpers

import (
	"fmt"
	"gastos-counter-api/graph/model"

	"gorm.io/gorm"
)

func GetUsers(db *gorm.DB) ([]*model.User, error) {
	var users []*model.User

	// Fetch raw users from the database
	if err := db.Find(&users).Error; err != nil {
		return nil, fmt.Errorf("failed to fetch users: %w", err)
	}

	return users, nil
}

// getUserByID fetches a user by ID from the database.
func GetUserByID(db *gorm.DB, userID string) (*model.User, error) {
	var user model.User
	if err := db.First(&user, "id = ?", userID).Error; err != nil {
		return nil, fmt.Errorf("could not find user with ID %s: %w", userID, err)
	}
	return &user, nil
}

func GetUsersByGroupId(db *gorm.DB, groupId string) ([]*model.User, error) {
	// Fetch groups from the `group_users` table for the given user ID
	var users []*model.User

	err := db.Model(&users).
		Joins("JOIN group_users ON users.id = group_users.user_id").
		Where("group_users.group_id = ?", groupId).
		Find(&users).Error

	if err != nil {
		return nil, err
	}

	return users, nil
}
