#!/bin/sh
# docker run -v $PWD/../../app:/usr/src/app --rm -it spa-builder

docker run -v $PWD/../../app:/mounted_app -v $PWD/spa:/spa_build --rm -it spa-builder