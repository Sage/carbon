#!/usr/bin/env bash
set -e

echo 'Build Docker Image'
docker build --rm -t carbon_cypress -f Dockerfile-cypress .

echo 'Setup complete'
