package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"time"

	env "github.com/aituglo/rubyx/golang/env"
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
	// Connexion à la base de données
	dbpool, err := env.Connect()
	if err != nil {
		log.Fatal(err)
	}
	defer dbpool.Close()

	// Génération d'un mot de passe aléatoire et d'un sel
	password := "passw0rd"
	salt := generateRandomString(32)

	// Hachage du mot de passe et du sel
	hashedPassword, err := hashPassword(password, salt)
	if err != nil {
		log.Fatal(err)
	}

	// Insertion d'un nouvel utilisateur avec le mot de passe et le sel hashés
	_, err = dbpool.Exec(context.Background(), "INSERT INTO users (email, pass, salt, status, verification) VALUES ($1, $2, $3, $4, $5)", "admin@admin.com", hashedPassword, salt, "active", "verificationcode")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Default user added !")
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
