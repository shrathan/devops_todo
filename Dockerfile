# Build Stage
FROM node:16 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
# RUN npm run build

# Production Stage
FROM node:16-slim
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000
CMD ["npm", "start"]
