#!/bin/sh

source .env

[  -d "${BUILD_DIR}" ] || mkdir "${BUILD_DIR}"

clasp create --title "$PROJECT_NAME" --rootDir ./build --type webapp
