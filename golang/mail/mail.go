package mail

import (
	"bytes"
	"fmt"
	"log"
	"net/url"
	"os"
)

// Mailer allows you to send transactional emails (or log them to stdOut) for a variety of events
type Mailer struct {
	Sender
}

type Sender interface {
	Send(to string, subject string, plain string, h *html) error
}

// New returns an intialized Mailer based on env
func New() *Mailer {
	if os.Getenv("ENV") == "dev" {
		return &Mailer{
			Sender: &LogMail{},
		}
	}

	// TODO: your transactional email service goes here!
	return &Mailer{
		Sender: &LogMail{},
	}
}

// Link provides environment adjusted link
func Link(p string, q *url.Values) *url.URL {
	u, err := url.Parse(os.Getenv("APP_ROOT"))
	if err != nil {
		log.Fatal(err)
	}

	u.Path = p

	if q != nil {
		u.RawQuery = q.Encode()
	}

	return u
}

// ResetPassword sends a link that the user can click to verify their email!
func (m *Mailer) ResetPassword(to string, code string) error {
	subject := "Reset Your Password"
	url := Link(fmt.Sprintf("reset/%s", code), nil)
	plain := fmt.Sprintf("Please click the following link to reset your password: %s", url)

	var content bytes.Buffer
	p(&content, "Hi,")
	p(&content, "Please click the button below to reset your password.")
	button(&content, &btn{
		Label: "Reset My Password",
		Href:  url.String(),
	})
	p(&content, "Thank you!")

	return m.Send(to, subject, plain, &html{
		Preview: "Click the following link to reset your password",
		Content: content,
	})
}
