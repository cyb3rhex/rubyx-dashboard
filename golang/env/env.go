package env

import (
	"github.com/aituglo/rubyx-dashboard/golang/db/wrapper"
	"github.com/aituglo/rubyx-dashboard/golang/mail"
	"github.com/jackc/pgx/v4/pgxpool"
	amqp "github.com/rabbitmq/amqp091-go"
)

type Env interface {
	DB() wrapper.Querier
	Close()
	Mailer() *mail.Mailer
	AMQP() (*amqp.Connection, *amqp.Channel, error)
	Queue(name string) (amqp.Queue, error)
}

// default impl
type env struct {
	db          *pgxpool.Pool
	querier     wrapper.Querier
	mail        *mail.Mailer
	amqpConn    *amqp.Connection
	amqpChannel *amqp.Channel
	queues      map[string]amqp.Queue
}

func (e *env) Queue(name string) (amqp.Queue, error) {
	queue, ok := e.queues[name]
	if !ok {

		q, err := e.amqpChannel.QueueDeclare(
			name,  // Nom de la file d'attente
			false, // Durable
			false, // Auto-suppression
			false, // Exclusivité
			false, // No-wait
			nil,   // Arguments supplémentaires
		)
		if err != nil {
			return amqp.Queue{}, err
		}
		e.queues[name] = q
		return q, nil
	}
	return queue, nil
}

func (e *env) DB() wrapper.Querier {
	return e.querier
}

func (e *env) Close() {
	e.db.Close()
}

func (e *env) Mailer() *mail.Mailer {
	return e.mail
}

func (e *env) AMQP() (*amqp.Connection, *amqp.Channel, error) {
	return e.amqpConn, e.amqpChannel, nil
}

func New() (Env, error) {
	db, err := Connect()
	if err != nil {
		return nil, err
	}

	querier := wrapper.NewQuerier(db)

	amqpConn, amqpChannel, err := ConnectRabbitMQ()
	if err != nil {
		return nil, err
	}

	env := &env{
		db:          db,
		querier:     querier,
		mail:        mail.New(),
		amqpConn:    amqpConn,
		amqpChannel: amqpChannel,
		queues:      make(map[string]amqp.Queue),
	}

	_, err = env.Queue("local")
	if err != nil {
		return nil, err
	}

	return env, nil
}

// Mock impl
func Mock(db wrapper.Querier, amqpConn *amqp.Connection, amqpChannel *amqp.Channel) Env {
	return &mock{
		db:          db,
		amqpConn:    amqpConn,
		amqpChannel: amqpChannel,
		queues:      make(map[string]amqp.Queue),
	}
}

type mock struct {
	db          wrapper.Querier
	amqpConn    *amqp.Connection
	amqpChannel *amqp.Channel
	queues      map[string]amqp.Queue
}

func (e *mock) DB() wrapper.Querier {
	return e.db
}
func (e *mock) Close() {
	e.amqpChannel.Close()
	e.amqpConn.Close()
}

func (e *mock) Mailer() *mail.Mailer {
	return nil
}

func (e *mock) AMQP() (*amqp.Connection, *amqp.Channel, error) {
	return e.amqpConn, e.amqpChannel, nil
}

func (e *mock) Queue(name string) (amqp.Queue, error) {
	queue, ok := e.queues[name]
	if !ok {

		q := amqp.Queue{Name: name}
		e.queues[name] = q
		return q, nil
	}
	return queue, nil
}
