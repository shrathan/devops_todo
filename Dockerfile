# Stage 1: Build Stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
#RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app /app
RUN npm install --only=production
EXPOSE 3000
CMD ["node", "server.js"]
