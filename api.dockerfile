FROM node:12-alpine

# Create work directory
WORKDIR /usr/src/app

# Solves could not get uid/gid errror
RUN yarn config set unsafe-perm true

# Copy app source to work directory
COPY . .

ARG APP_PORT=3000

EXPOSE ${APP_PORT}
