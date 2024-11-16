package database

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type dbConfig struct {
	host     string
	port     int
	user     string
	dbname   string
	password string
}

func getDatabaseUrl() string {
	// Load environment variables from a .env file (if it exists)
	err := godotenv.Load()

	if err != nil {
		fmt.Println("Error loading .env file")
	}

	var config = dbConfig{"localhost", 5432, os.Getenv("DB_USER"), "gastos-counter-db", os.Getenv("DB_PASS")}

	return fmt.Sprintf(
		"host=%s port=%d user=%s dbname=%s password=%s",
		config.host, config.port, config.user, config.dbname, config.password)
}

func Connect() *gorm.DB {
	dsn := getDatabaseUrl()
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Postgres connection failed")
	}
	return db
}
