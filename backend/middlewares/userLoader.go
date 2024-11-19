package middlewares

import (
	"context"
	"gastos-counter-api/graph/loaders"
	"net/http"

	"gorm.io/gorm"
)

func UserLoaderMiddleware(db *gorm.DB, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		// Create the dataloader
		userLoader := loaders.CreateUserLoader(db)

		// Add the loader to context
		ctx = context.WithValue(ctx, "userLoader", userLoader)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
