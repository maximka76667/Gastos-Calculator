package model

type Expense struct {
	ID           string  `json:"id"`
	UserId       string  `json:"user"`
	GroupId      string  `json:"group"`
	Amount       float64 `json:"amount"`
	IsMain       bool    `json:"isMain"`
	Name         string  `json:"name"`
	CurrencyCode string  `json:"currencyCode"`
	LastModified string  `json:"lastModified"`
}
