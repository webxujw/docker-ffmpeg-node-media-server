#!/bin/bash

cd  /app

rm -rf node_modules/ && yarn && pm2-runtime pm2.json