FROM node:18.12.1-alpine as build

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build:prod


FROM scratch

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/out/ewidencja-czasu-clockify-backend /app/main

EXPOSE 3000
CMD [ "./main" ]
