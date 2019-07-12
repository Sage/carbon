#!/usr/bin/env bash
set -e

export COMPOSE_FILE=docker-compose-cypress.yml
export DOCKER_CLIENT_TIMEOUT=720
export COMPOSE_HTTP_TIMEOUT=720

echo 'Starting docker compose'
docker-compose up -d
