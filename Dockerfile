
FROM node:12-alpine AS builder

WORKDIR /src/app

COPY package.json .

COPY . .

RUN npm install --quiet --no-audit --no-optional

RUN npm run build


FROM nginx:1-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /src/app/www/ .

EXPOSE 80
