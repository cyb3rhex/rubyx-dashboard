FROM alpine:latest

RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
    bash \
    build-base \
    curl \
    git \
    wget \
    go

# Configurer le chemin d'accès à Golang
ENV PATH="/usr/local/go/bin:${PATH}"

ARG DEBIAN_FRONTEND=noninteractive
SHELL ["/bin/bash", "-c"]
ENV PATH "$PATH:/root/osmedeus-base/binaries/"
WORKDIR /root/

RUN curl -fsSL https://raw.githubusercontent.com/osmedeus/osmedeus-base/master/install.sh -o /tmp/install.sh
RUN chmod +x /tmp/install.sh
RUN /tmp/install.sh

CMD ["tail", "-f", "/dev/null"]