#!/bin/bash
# docker system prune
docker build -t tf00185077/docker-nginx ./nginx
docker push tf00185077/docker-nginx
# $SHELL
# docker system prune
docker build -t tf00185077/docker-practice .
docker push tf00185077/docker-practice
# $SHELL