#!/bin/bash

SRC_ROOT=$1

cd "${SRC_ROOT}" || exit
pwd

echo "Build for environnement: ${CI_ENVIRONMENT_NAME}..."
pnpm "build:${CI_ENVIRONMENT_NAME}" || exit $?
echo "Build successful!"

echo "Zip of dist folder..."
zip -r dist.zip dist
echo "Zip Done!"
