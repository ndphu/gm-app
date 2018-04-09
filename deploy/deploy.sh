#!/bin/sh

rm -rf ./build
cp -r ../build ./

find . -name "*.css.map" -type f -delete
find . -name "*.js.map" -type f -delete

cf push 

