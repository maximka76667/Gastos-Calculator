package helpers

import (
	"errors"
	"fmt"
	"gastos-counter-api/graph/model"

	"gorm.io/gorm"
)

// Query helpers -- START
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

// Query helpers -- END

// Mutation helpers -- START
func AddRole(db *gorm.DB, role model.CreateRoleInput) (*model.Role, error) {
	newRole := model.Role{
		Name: role.Name,
	}

	return AddModel(db, newRole)
}

func EditRole(db *gorm.DB, id string, role model.EditRoleInput) (*model.Role, error) {
	roleToUpdate, err := GetRoleById(db, id)
	if err != nil {
		return nil, err
	}

	// Update the fields of the role
	if role.Name != nil {
		roleToUpdate.Name = *role.Name
	}

	return SaveModel(db, roleToUpdate)
}

func DeleteRole(db *gorm.DB, id string) (*model.Role, error) {
	roleToDelete, err := GetRoleById(db, id)
	if err != nil {
		return nil, err
	}

	return DeleteModel(db, roleToDelete)
}

// Mutation helpers -- END
