#!/bin/sh

for service in $(ls -d */); do cd $service && npm test && cd ..; done