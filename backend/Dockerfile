FROM node:22-alpine3.19 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY src src

FROM node:22-alpine3.19
WORKDIR /app
COPY --from=builder /app /app
ENTRYPOINT ["node", "src/app.js"]