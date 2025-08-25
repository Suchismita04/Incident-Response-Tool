package user

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"server/internal/config"
	"server/internal/model"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

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
	// var user model.Users
}
