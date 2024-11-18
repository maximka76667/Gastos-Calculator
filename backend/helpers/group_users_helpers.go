package helpers

import (
	"fmt"
	"gastos-counter-api/graph/model"

	"gorm.io/gorm"
)

func GetGroupUsers(db *gorm.DB) ([]*model.GroupUser, error) {
	var groupUsers []*model.GroupUser

	// Fetch all group-user relationships from the database
	if err := db.Find(&groupUsers).Error; err != nil {
		return nil, fmt.Errorf("failed to fetch group users: %w", err)
	}

	return groupUsers, nil
}

// GetGroupUsersByGroup fetches all group-user relationships for a specific group.
func GetGroupUsersByGroup(db *gorm.DB, groupId string) ([]*model.GroupUser, error) {
	var groupUsers []*model.GroupUser
	err := db.Where("group_id = ?", groupId).Find(&groupUsers).Error
	if err != nil {
		return nil, fmt.Errorf("failed to fetch group users for group ID %s: %w", groupId, err)
	}
	return groupUsers, nil
}

// GetGroupUsersByUser fetches all group-user relationships for a specific user.
func GetGroupUsersByUser(db *gorm.DB, userId string) ([]*model.GroupUser, error) {
	var groupUsers []*model.GroupUser
	err := db.Where("user_id = ?", userId).Find(&groupUsers).Error
	if err != nil {
		return nil, fmt.Errorf("failed to fetch group users for user ID %s: %w", userId, err)
	}
	return groupUsers, nil
}

// GetGroupUser fetches a specific group-user relationship based on group ID and user ID.
func GetGroupUser(db *gorm.DB, groupId, userId string) (*model.GroupUser, error) {
	var groupUser model.GroupUser
	err := db.Where("group_id = ? AND user_id = ?", groupId, userId).First(&groupUser).Error
	if err != nil {
		return nil, fmt.Errorf("failed to fetch group user: %w", err)
	}
	return &groupUser, nil
}
