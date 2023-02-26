FROM node:19.7.0-alpine3.17 as build

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build:prod


FROM 19.7.0-alpine3.17 as modules

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --frozen-lockfile --production


FROM 19.7.0-alpine3.17 as release

WORKDIR /app

COPY --from=modules /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["yarn", "start:prod"]
