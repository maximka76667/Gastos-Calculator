package helpers

import (
	"errors"
	"fmt"
	"gastos-counter-api/graph/model"

	"gorm.io/gorm"
)

func GetRoles(db *gorm.DB) ([]*model.Role, error) {
	var roles []*model.Role

	if err := db.Find(&roles).Error; err != nil {
		return nil, fmt.Errorf("failed to fetch roles: %w", err)
	}

	return roles, nil
}

func GetRole(db *gorm.DB, userId string, groupId string) (*model.Role, error) {
	var role *model.Role

	err := db.Model(&model.Role{}).
		Table("group_users").
		Select("roles.id, roles.name").
		Joins("JOIN roles ON group_users.role_id = roles.id").
		Where("group_users.user_id = ? AND group_users.group_id = ?", userId, groupId).
		Scan(&role).Error

	if err != nil {
		return nil, err
	}

	return role, nil
}

func GetRoleById(db *gorm.DB, id string) (*model.Role, error) {
	var role model.Role

	if err := db.Where("id = ?", id).First(&role).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("role with ID %s not found", id)
		}
		return nil, fmt.Errorf("failed to fetch role: %w", err)
	}

	return &role, nil
}
