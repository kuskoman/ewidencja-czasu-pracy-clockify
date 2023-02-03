#! /usr/bin/env bash

set -euo pipefail

cd ./frontend
yarn --frozen-lockfile
yarn build

cd ../backend
yarn --frozen-lockfile
cp -r ../frontend/dist/frontend/* ./static/
yarn build:prod

FRONTEND_SERVE=true ./out/ewidencja-czasu-clockify-backend
