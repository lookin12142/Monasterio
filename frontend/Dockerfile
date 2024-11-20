FROM node:22-alpine3.19 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine3.19
WORKDIR /app
COPY --from=builder /app .
CMD ["npm", "start"]