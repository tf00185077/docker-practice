#!/bin/bash
docker system prune
docker build -t tf00185077/docker-nginx .
docker push tf00185077/docker-nginx
$SHELL