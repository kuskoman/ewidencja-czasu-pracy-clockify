FROM node:19.4.0-alpine as frontend

WORKDIR /frontend
COPY ./frontend/package.json ./frontend/yarn.lock ./

RUN yarn install --frozen-lockfile
COPY ./frontend .
RUN yarn build

FROM node:18.12.1-alpine as backend

WORKDIR /backend

COPY ./backend/package.json ./backend/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --from=frontend /frontend/dist/* ./static/
COPY ./backend .

# TODO: move fetching Node to previous step, so it could be cached (pkg-cache could be utilized)
RUN yarn build:prod

FROM alpine as release

# todo: change FRONTEND_SERVE to path to static files
ENV NODE_ENV=production \
    FRONTEND_SERVE=true

COPY --from=backend /backend/out/ewidencja-czasu-clockify-backend /app

EXPOSE 3000
CMD [ "./app" ]
