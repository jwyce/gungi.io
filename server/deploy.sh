#!/bin/bash

echo What should the version be?
read VERSION

docker build -t jwyce/gungi:$VERSION .
docker push jwyce/gungi:$VERSION

ssh root@165.22.180.188 "docker pull jwyce/gungi:$VERSION && docker tag jwyce/gungi:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"