# Pale Blue Dot — single Cloud Run service (Express API serves the built web app)
FROM node:22-slim

WORKDIR /app

# Install all dependencies (dev deps are needed to build and to run via tsx)
COPY package.json package-lock.json ./
RUN npm ci

# Build the web app into dist/web
COPY . .
RUN npm run build

# Analytics writes to an ephemeral, writable location on Cloud Run
ENV DATA_DIR=/tmp/pbd-storage
ENV NODE_ENV=production

# Cloud Run injects PORT (default 8080); the server reads process.env.PORT
CMD ["npm", "start"]
