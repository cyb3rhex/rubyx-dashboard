FROM golang:1.20 as dev
WORKDIR /app
RUN go install github.com/cortesi/modd/cmd/modd@latest
RUN go install github.com/kyleconroy/sqlc/cmd/sqlc@v1.15.0
RUN go install github.com/golang/mock/mockgen@v1.6.0
COPY go.* ./
RUN go mod download
COPY . .

CMD modd -f server.modd.conf

FROM golang:1.20 as prod
WORKDIR /app
COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -o serverbin ./cmd/server/server.go
CMD ["/root/serverbin"]

