#!/bin/sh
ls
rm -rf /temp/*
cp -r /mounted_app/. /temp/
ls

npm ci
# npm install -g @quasar/cli
npm run build

cp -r /temp/dist /spa_build
