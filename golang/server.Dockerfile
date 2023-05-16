FROM golang:1.19 as dev
WORKDIR /app
RUN go install github.com/cortesi/modd/cmd/modd@latest
RUN go install github.com/kyleconroy/sqlc/cmd/sqlc@v1.15.0
RUN go install github.com/golang/mock/mockgen@v1.6.0
COPY go.* ./
RUN go mod download
COPY . .

RUN apt-get update
RUN apt-get install chromium -y

RUN git clone https://github.com/Aituglo/rubyx-data /rubyx-data
RUN go install -v github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest
RUN go install github.com/ffuf/ffuf/v2@latest
RUN go install github.com/projectdiscovery/katana/cmd/katana@latest

CMD modd -f server.modd.conf

FROM golang:1.19 as prod
WORKDIR /app
COPY . .
RUN apt-get update
RUN apt-get install chromium -y

RUN git clone https://github.com/Aituglo/rubyx-data /rubyx-data
RUN go install -v github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest
RUN go install github.com/ffuf/ffuf/v2@latest
RUN go install github.com/projectdiscovery/katana/cmd/katana@latest

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -o serverbin ./cmd/server/server.go
CMD ["/root/serverbin"]

