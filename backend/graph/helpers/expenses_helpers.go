package helpers

import (
	"errors"
	"fmt"
	"gastos-counter-api/graph/model"

	"gorm.io/gorm"
)

// Query helpers -- START
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

// Query helpers -- END

// Mutation helpers -- START
func AddExpense(db *gorm.DB, expense model.CreateExpenseInput) (*model.Expense, error) {
	newExpense := model.Expense{
		UserId:       expense.UserID,
		GroupId:      expense.GroupID,
		IsMain:       expense.IsMain,
		Name:         expense.Name,
		CurrencyCode: *expense.CurrencyCode,
		Amount:       expense.Amount,
	}

	return AddModel(db, newExpense)
}

func EditExpense(db *gorm.DB, id string, expense model.EditExpenseInput) (*model.Expense, error) {
	// Fetch the existing expense by id
	expenseToUpdate, err := GetExpenseById(db, id)
	if err != nil {
		return nil, fmt.Errorf("expense not found: %w", err)
	}

	// Update fields if provided
	if expense.UserID != nil {
		expenseToUpdate.UserId = *expense.UserID
	}
	if expense.GroupID != nil {
		expenseToUpdate.GroupId = *expense.GroupID
	}
	if expense.Amount != nil {
		expenseToUpdate.Amount = *expense.Amount
	}
	if expense.IsMain != nil {
		expenseToUpdate.IsMain = *expense.IsMain
	}
	if expense.Name != nil {
		expenseToUpdate.Name = *expense.Name
	}
	if expense.CurrencyCode != nil {
		expenseToUpdate.CurrencyCode = *expense.CurrencyCode
	}

	return SaveModel(db, expenseToUpdate)
}

func DeleteExpense(db *gorm.DB, id string) (*model.Expense, error) {
	expenseToDelete, err := GetExpenseById(db, id)
	if err != nil {
		return nil, err
	}

	return DeleteModel(db, expenseToDelete)
}

// Mutation helpers -- END
