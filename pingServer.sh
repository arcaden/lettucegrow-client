#!/bin/bash

while true
do
  curl -s -o /dev/null -w "%{http_code}" https://rails-mry7.onrender.com/
  sleep 5
done