#!/usr/bin/env bash

echo "installing npm dependencies"
rm -rf node_modules > /dev/null 2>&1
npm cache clean
npm install

echo "running build task"
npm run build