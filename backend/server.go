package main

import (
	"fmt"
	"gastos-counter-api/database"
	"gastos-counter-api/graph"
	"gastos-counter-api/middlewares"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/joho/godotenv"
)

const defaultPort = "8080"

func main() {
	// Load .env file
	err := godotenv.Load() // Adjust the path if needed
	if err != nil {
		fmt.Println("Error loading .env file:", err)
		os.Exit(1)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	db := database.Connect()

	config := graph.Config{Resolvers: &graph.Resolver{DB: db}}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(config))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", middlewares.UserLoaderMiddleware(db, srv))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
