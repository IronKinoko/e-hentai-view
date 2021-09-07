#!/bin/sh
if [[ ! -d node_modules ]]; then
  echo 'install dependencies'
  yarn install
  node scripts/buildTime.js
  yarn build
  rm -rf node_modules
  yarn install --production
else
  echo 'node_modules exist'
fi
