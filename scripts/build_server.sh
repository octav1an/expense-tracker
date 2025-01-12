#!/bin/bash
# Copy server files to the build directory, they don't need to be compiled
set -e

source .env


[  -d $BUILD_DIR ] || mkdir $BUILD_DIR

cp -r server/ $BUILD_DIR

