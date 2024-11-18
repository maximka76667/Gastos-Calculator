package helpers

import (
	"fmt"
	"gastos-counter-api/graph/model"

	"gorm.io/gorm"
)

func GetGroups(db *gorm.DB) ([]*model.Group, error) {
	var groups []*model.Group

	if err := db.Find(&groups).Error; err != nil {
		return nil, fmt.Errorf("failed to fetch groups %v", err)
	}

	return groups, nil
}

// getUserByID fetches a user by ID from the database.
func GetGroupById(db *gorm.DB, groupID string) (*model.Group, error) {
	var group model.Group
	if err := db.First(&group, "id = ?", groupID).Error; err != nil {
		return nil, fmt.Errorf("could not find group with ID %s: %w", groupID, err)
	}
	return &group, nil
}

func GetGroupsByUserId(db *gorm.DB, userId string) ([]*model.Group, error) {
	// Fetch groups from the `group_users` table for the given user ID
	var groups []*model.Group

	err := db.Model(&groups).
		Joins("JOIN group_users ON groups.id = group_users.group_id").
		Where("group_users.user_id = ?", userId).
		Find(&groups).Error

	if err != nil {
		return nil, err
	}

	return groups, nil
}
