package helpers

import (
	"errors"
	"fmt"
	"gastos-counter-api/graph/model"

	"gorm.io/gorm"
)

func GetExpenses(db *gorm.DB) ([]*model.Expense, error) {
	var expenses []*model.Expense

	if err := db.Find(&expenses).Error; err != nil {
		return nil, fmt.Errorf("failed to fetch expenses %v", err)
	}

	return expenses, nil
}

func GetExpenseById(db *gorm.DB, id string) (*model.Expense, error) {
	var expense model.Expense
	if err := db.First(&expense, "id = ?", id).Error; err != nil {
		return nil, fmt.Errorf("could not find expense with ID %s: %w", id, err)
	}
	return &expense, nil
}

func GetExpense(db *gorm.DB, groupId string, userId string) (*model.Expense, error) {
	var expense model.Expense

	if err := db.Where("group_id = ? AND user_id = ?", groupId, userId).First(&expense).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("expense not found for group %s and user %s", groupId, userId)
		}
		return nil, fmt.Errorf("failed to fetch expense: %w", err)
	}

	return &expense, nil
}

func GetExpensesByGroupId(db *gorm.DB, groupId string) ([]*model.Expense, error) {
	var expenses []*model.Expense

	if err := db.Where("group_id = ?", groupId).Find(&expenses).Error; err != nil {
		return nil, fmt.Errorf("failed to fetch expenses for group %s: %w", groupId, err)
	}

	return expenses, nil
}

func GetExpensesByUserId(db *gorm.DB, userId string) ([]*model.Expense, error) {
	var expenses []*model.Expense

	if err := db.Where("user_id = ?", userId).Find(&expenses).Error; err != nil {
		return nil, fmt.Errorf("failed to fetch expenses for user %s: %w", userId, err)
	}

	return expenses, nil
}
