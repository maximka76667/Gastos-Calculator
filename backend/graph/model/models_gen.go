// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Expense struct {
	ID           string  `json:"id"`
	User         *User   `json:"user"`
	Group        *Group  `json:"group"`
	Amount       float64 `json:"amount"`
	IsMain       bool    `json:"isMain"`
	Name         string  `json:"name"`
	CurrencyCode string  `json:"currencyCode"`
	LastModified string  `json:"lastModified"`
}

type Query struct {
}

type Role struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}
