# Base Image
FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# Development stage
FROM base AS development
ENV NODE_ENV=development
WORKDIR /app

# Install development dependencies
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Production stage
FROM base AS production
ENV NODE_ENV=production
WORKDIR /app

COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
