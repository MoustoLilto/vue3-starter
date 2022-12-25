#!/bin/bash

SRC_ROOT=$1
NODE_VERSION=$2

cd "${SRC_ROOT}" || exit $?
pwd

git --version

source ~/.bashrc
nvm use "${NODE_VERSION}"
printf "node version "
node --version

printf "\npnpm version "
pnpm --version
pnpm config list

pnpm install --frozen-lockfile || exit $?
