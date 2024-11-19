package helpers

import (
	"fmt"
	"gastos-counter-api/graph/loaders"
	"gastos-counter-api/graph/model"
	"gastos-counter-api/utils"

	"gorm.io/gorm"
)

func GetUsers(db *gorm.DB) ([]*model.User, error) {
	var users []*model.User

	// Fetch raw users from the database
	if err := db.Find(&users).Error; err != nil {
		return nil, fmt.Errorf("failed to fetch users: %w", err)
	}

	fmt.Println("Users fetched from database: ", users)

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

func GetUsersByGroupId(db *gorm.DB, loader *loaders.UserLoader, groupId string) ([]*model.User, error) {
	users, err := loader.Load(groupId)

	if err != nil {
		return nil, fmt.Errorf("failed to load members: %w", err)
	}

	return users, nil
}

// Mutation helpers -- START
func AddUser(db *gorm.DB, user model.CreateUserInput) (*model.User, error) {
	hashedPassword, err := utils.HashPassword(user.Password)

	if err != nil {
		return nil, err
	}

	newUser := model.User{
		Email:             user.Email,
		FullName:          user.FullName,
		Username:          user.Username,
		PreferredCurrency: *user.PreferredCurrency,
		Password:          hashedPassword,
	}

	return AddModel(db, newUser)
}

func EditUser(db *gorm.DB, id string, user model.EditUserInput) (*model.User, error) {
	userToUpdate, err := GetUserByID(db, id)

	if err != nil {
		return nil, err
	}

	// Update the fields of the user
	if user.Email != nil {
		userToUpdate.Email = *user.Email
	}
	if user.FullName != nil {
		userToUpdate.FullName = *user.FullName
	}
	if user.Username != nil {
		userToUpdate.Username = *user.Username
	}
	if user.PreferredCurrency != nil {
		userToUpdate.PreferredCurrency = *user.PreferredCurrency
	}

	if user.Password != nil {
		hashedPassword, err := utils.HashPassword(*user.Password)
		if err != nil {
			return nil, fmt.Errorf("failed to hash password: %w", err)
		}
		userToUpdate.Password = hashedPassword
	}

	return SaveModel(db, userToUpdate)
}

func DeleteUser(db *gorm.DB, id string) (*model.User, error) {
	userToDelete, err := GetUserByID(db, id)

	if err != nil {
		return nil, err
	}

	return DeleteModel(db, userToDelete)
}

// Mutation helpers -- END
