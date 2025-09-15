package middleware

import (
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

type Claims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

var jwtKey = []byte(os.Getenv("JWT_SECRET_TOKEN"))

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenStr := r.Header.Get("Authorizetion")
		if tokenStr == "" {
			http.Error(w, "Missing Token", http.StatusBadRequest)
			return
		}

		claims := &Claims{}

		tkn, err := jwt.ParseWithClaims(tokenStr, claims, func(t *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil || !tkn.Valid {
			http.Error(w, "Invalid Token", http.StatusBadRequest)
			return
		}

		r.Header.Set("email", claims.Email)
		next.ServeHTTP(w, r)

	})
}
