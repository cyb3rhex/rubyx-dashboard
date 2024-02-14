package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"time"

	env "github.com/aituglo/rubyx-dashboard/golang/env"
	"golang.org/x/crypto/bcrypt"
)

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
const (
	letterIdxBits = 6                    // 6 bits pour représenter un index dans letterBytes
	letterIdxMask = 1<<letterIdxBits - 1 // Tous les 1-bits, comme dans le modulo
	letterIdxMax  = 63 / letterIdxBits   // Le nombre d'indexes qui peuvent être représentés dans 63 bits
)

var src = rand.NewSource(time.Now().UnixNano())

func main() {
	dbpool, err := env.Connect()
	if err != nil {
		log.Fatal(err)
	}
	defer dbpool.Close()

	password := "passw0rd"
	salt := generateRandomString(32)

	hashedPassword, err := hashPassword(password, salt)
	if err != nil {
		log.Fatal(err)
	}

	_, err = dbpool.Exec(context.Background(), "INSERT INTO users (email, username, pass, salt) VALUES ($1, $2, $3, $4)", "admin@admin.com", "admin", hashedPassword, salt)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Default user added and database initializated !")
}

func generateRandomString(n int) string {
	b := make([]byte, n)
	for i, cache, remain := n-1, src.Int63(), letterIdxMax; i >= 0; {
		if remain == 0 {
			cache, remain = src.Int63(), letterIdxMax
		}
		if idx := int(cache & letterIdxMask); idx < len(letterBytes) {
			b[i] = letterBytes[idx]
			i--
		}
		cache >>= letterIdxBits
		remain--
	}

	return string(b)
}

func hashPassword(password, salt string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password+salt), 14)
	return string(bytes), err
}
