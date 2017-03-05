#!/bin/bash          

docker run -d --name utahroadseriesdb mongo:latest
docker run -d --name uploads -v /usr/src/public/uploads busybox:latest
docker run -d --name utahraceseries --env NODE_ENV=production -p 80:3000 --volumes-from uploads --link utahroadseriesdb:utahroadseriesdb scottmtraver/runonroads
