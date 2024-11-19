package helpers

import (
	"fmt"
	"gastos-counter-api/graph/model"

	"gorm.io/gorm"
)

// Query helpers -- START

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

// Query helpers -- END

// Mutation helpers -- START

func AddGroup(db *gorm.DB, group model.CreateGroupInput) (*model.Group, error) {
	newGroup := model.Group{
		Name: group.Name,
	}

	return AddModel(db, newGroup)
}

func EditGroup(db *gorm.DB, id string, group model.EditGroupInput) (*model.Group, error) {
	groupToUpdate, err := GetGroupById(db, id)
	if err != nil {
		return nil, err
	}

	// Update the fields of the group
	if group.Name != nil {
		groupToUpdate.Name = *group.Name
	}

	return SaveModel(db, groupToUpdate)
}

func DeleteGroup(db *gorm.DB, id string) (*model.Group, error) {
	groupToDelete, err := GetGroupById(db, id)
	if err != nil {
		return nil, err
	}

	return DeleteModel(db, groupToDelete)
}

// Mutation helpers -- END
