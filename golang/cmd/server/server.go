package main

import (
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/aituglo/rubyx-dashboard/golang/server"
	"github.com/aituglo/rubyx-dashboard/golang/task"
)

const port = ":5000"

func main() {
	go handleSignals()

	srv, env, err := server.New()
	if err != nil {
		log.Fatalln("Unable to initialize server", err)
	}
	defer srv.Close()

	// start consuming tasks
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	go task.ConsumeLocalQueue(env)

	log.Println("API server listening on", port)
	err = http.ListenAndServe(port, srv)

	if err != nil {
		log.Fatalln("ListenAndServe error:", err)
	}
	<-stop
}

func handleSignals() {
	signalChan := make(chan os.Signal, 1)
	signal.Notify(signalChan,
		syscall.SIGHUP,
		syscall.SIGINT,
		syscall.SIGTERM,
		syscall.SIGQUIT)

	exitChan := make(chan int)
	go func() {
		for {
			s := <-signalChan
			switch s {
			case syscall.SIGHUP,
				syscall.SIGINT,
				syscall.SIGTERM,
				syscall.SIGQUIT:
				log.Println("Received shutdown signal:", s)
				exitChan <- 0

			default:
				log.Println("Unknown signal!?", s)
				exitChan <- 1
			}
		}
	}()

	code := <-exitChan
	os.Exit(code)
}
