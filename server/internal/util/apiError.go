package util

import "fmt"

type ApiError struct {
	Message string
	Code    int
}

func (e ApiError) Error() string {
	return fmt.Sprintf("Error %d:%s", e.Code, e.Message)
}

func ThrowApiError(m string, code int) {
	panic(ApiError{Message: m, Code: code})
}
