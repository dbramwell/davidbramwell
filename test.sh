#!/bin/sh

cd services && ./test.sh && cd ../client && CI=true npm test