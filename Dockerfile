# Build stage
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY package-lock.json ./

# Install only production dependencies
# Using npm install instead of ci for better compatibility
RUN npm install --omit=dev --ignore-scripts

# Copy built application
COPY --from=builder /usr/src/app/dist ./dist

# Add non-root user
RUN addgroup -g 1001 nodejs && \
  adduser -S -u 1001 -G nodejs nodejs

USER nodejs

# Prevent Husky and other dev tools
ENV HUSKY=0
ENV CI=true
ENV NPM_CONFIG_PRODUCTION=true

EXPOSE 3000

CMD ["node", "dist/main"]