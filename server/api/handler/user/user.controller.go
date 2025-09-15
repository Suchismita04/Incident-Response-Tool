package user

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"server/internal/config"
	"server/internal/model"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

// jwt Claims
type Claims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

// Register User Controller

func RegisterUser(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")

	var user model.Users
	err := json.NewDecoder(req.Body).Decode(&user)

	if err != nil {
		http.Error(res, "Invalid request body", http.StatusBadRequest)
	}

	collection := config.ConnectDB()

	// Check if user already exists
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var existingUser model.Users
	if err := collection.FindOne(ctx, bson.M{"email": user.EMAIL}).Decode(&existingUser); err == nil {
		http.Error(res, "User already exists", http.StatusConflict)
		return
	}

	// hash password
	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(user.PASSWORD), bcrypt.DefaultCost)
	if err != nil {
		http.Error(res, "Error hashing password", http.StatusInternalServerError)
		return
	}
	user.PASSWORD = string(hashedPwd)

	_, err = collection.InsertOne(ctx, user)
	if err != nil {
		fmt.Print(err)
		http.Error(res, "Error creating user", http.StatusInternalServerError)
		return
	}

	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(map[string]string{"message": "User registered successfully"})
}

func LoginUser(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")
	var user model.Users

	fmt.Print("hetting")
	fmt.Print((req.Body))
	err := json.NewDecoder(req.Body).Decode(&user)

	if err != nil {
		http.Error(res, "Invalid request", http.StatusBadRequest)
		return
	}

	collection := config.ConnectDB()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var existingUser model.Users

	err = collection.FindOne(ctx, bson.M{"email": user.EMAIL}).Decode(&existingUser)
	if err != nil {
		http.Error(res, "User is not exist", http.StatusBadRequest)
		return
	}

	//compare the hased pwd

	if err := bcrypt.CompareHashAndPassword([]byte(existingUser.PASSWORD), []byte(user.PASSWORD)); err != nil {
		http.Error(res, "Invalid Passowrd", http.StatusBadRequest)
		return
	}

	//create a jwt claims

	expireTime := time.Now().Add(15 * time.Minute)

	claims := &Claims{
		Email: existingUser.EMAIL,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expireTime),
		},
	}

	//geerate jwt
	fmt.Print(os.Getenv("JWT_SECRET_TOKEN"))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, _ := token.SignedString([]byte(os.Getenv("JWT_SECRET_TOKEN")))
	http.SetCookie(res, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expireTime,
	})

	json.NewEncoder(res).Encode(map[string]string{"token": tokenString})

}

func GetUserInfo(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")

}
