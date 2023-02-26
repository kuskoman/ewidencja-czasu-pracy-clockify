FROM node:19.7.0-alpine3.17 as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build


FROM node:19.7.0-alpine3.17 as modules

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production


FROM node:19.7.0-alpine3.17 as release

WORKDIR /app

COPY package.json yarn.lock ./
COPY templates/ ./templates
COPY --from=modules /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["yarn", "start:prod"]
