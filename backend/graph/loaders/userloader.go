package loaders

import (
	"context"
	"gastos-counter-api/graph/model"
	"time"

	"gorm.io/gorm"
)

type GroupUserExtended struct {
	*model.User
	*model.GroupUser
}

func CreateUserLoader(db *gorm.DB) *UserLoader {
	return NewUserLoader(UserLoaderConfig{
		MaxBatch: 100,
		Wait:     1 * time.Millisecond,
		Fetch: func(keys []string) ([][]*model.User, []error) {
			var groupUsers []*GroupUserExtended

			err := db.Table("users").
				Joins("JOIN group_users ON users.id = group_users.user_id").
				Where("group_users.group_id IN ?", keys).
				Scan(&groupUsers).Error

			if err != nil {
				return nil, []error{err}
			}

			result := make(map[string][]*model.User)

			for _, groupUser := range groupUsers {
				result[groupUser.GroupId] = append(result[groupUser.GroupId], &model.User{
					ID:                groupUser.UserId,
					Email:             groupUser.Email,
					FullName:          groupUser.FullName,
					Username:          groupUser.Username,
					Password:          groupUser.Password,
					PreferredCurrency: groupUser.PreferredCurrency,
				})
			}

			finalResult := make([][]*model.User, len(keys))
			for i, key := range keys {
				finalResult[i] = result[key] // Populate the i-th slice
			}

			return finalResult, nil
		},
	})
}

func GetUserLoader(ctx context.Context) *UserLoader {
	return ctx.Value("userLoader").(*UserLoader)
}
