package helpers

import (
	"fmt"
	"gastos-counter-api/graph/model"

	"gorm.io/gorm"
)

type Model interface {
	model.User | model.Group | model.Role | model.GroupUser | model.Expense
}

func AddModel[T Model](db *gorm.DB, newValue T) (*T, error) {
	if err := db.Create(&newValue).Error; err != nil {
		return nil, fmt.Errorf("failed to create %v: %w", newValue, err)
	}

	return &newValue, nil
}

func SaveModel[T Model](db *gorm.DB, newValue *T) (*T, error) {
	if err := db.Save(&newValue).Error; err != nil {
		return nil, fmt.Errorf("failed to update %v: %w", newValue, err)
	}

	return newValue, nil
}

func DeleteModel[T Model](db *gorm.DB, valueToDelete *T) (*T, error) {
	if err := db.Delete(&valueToDelete).Error; err != nil {
		return nil, fmt.Errorf("failed to delete %v: %w", valueToDelete, err)
	}

	return valueToDelete, nil
}
