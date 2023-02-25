FROM node:19.4.0-alpine as build

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM httpd:2.4.55-alpine as release

RUN apk add --no-cache gettext

COPY .docker/app-config.template.json /usr/local/
COPY .docker/entrypoint.sh /usr/local/bin/
COPY --from=build /app/dist/frontend /usr/local/apache2/htdocs/

CMD ["/usr/local/bin/entrypoint.sh"]
