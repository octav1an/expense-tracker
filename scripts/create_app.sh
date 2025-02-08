#!/bin/sh

source .env

[  -d "${BUILD_DIR}" ] || mkdir "${BUILD_DIR}"

clasp create --title "$PROJECT_NAME" --rootDir ./build --type webapp
cp appsscript.json "${BUILD_DIR}"

# Create a symlink to clasp in the project root folder to avoid always calling clasp with -P arg
ln -s build/.clasp.json .clasp.json
