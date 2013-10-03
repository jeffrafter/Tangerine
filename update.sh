#!/bin/sh

cd app/_attachments/js
./init.sh
cd ../..
couchapp push
cp -R _attachments/* ../../tangerine-pouch/www/
cd ..
