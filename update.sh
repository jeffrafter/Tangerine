#!/bin/sh

cd app/_attachments/js
./init.sh
cd ../..
/usr/local/share/python/couchapp push
cp -R _attachments/* ../../tangerine-pouch/www/
cd ..
