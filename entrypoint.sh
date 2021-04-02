#!/bin/bash

cd  /serve

rm -rf node_modules/ && cnpm install && pm2-runtime pm2.json