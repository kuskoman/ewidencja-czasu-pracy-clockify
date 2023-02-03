FROM node:19.4.0-alpine as build

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM httpd:2.4.55-alpine as release

COPY --from=build /app/dist /usr/local/apache2/htdocs/
