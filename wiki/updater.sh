#!/bin/bash

# Start this with a screen as a side process to keep site updated.
while true; do
    git pull
    sleep 30
done
