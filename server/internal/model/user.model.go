package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Users struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	NAME     string             `bson:"name"`
	EMAIL    string             `bson:"email"`
	PASSWORD string             `bson:"password"`
}
