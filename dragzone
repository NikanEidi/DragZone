# 🐉 DRAGZONE — UNIFIED SERVICE MESH
# Multi-stage build for a high-performance Cyber Dragon engine

# PHASE 1: Build Frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# PHASE 2: Python Backend & Runtime
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    libc6 \
    && rm -rf /var/lib/apt/lists/*

# Install Backend Dependencies
COPY DragEngine/requirements.txt ./DragEngine/requirements.txt
RUN pip install --no-cache-dir -r ./DragEngine/requirements.txt

# Copy backend source
COPY DragEngine ./DragEngine

# Copy frontend build as static assets to be served by FastAPI or for local access
# We'll serve the UI from the same container using the vite dev server for symmetry with the script
# OR we serve static files. To keep it consistent with "run the script", let's include node to run dev server
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

COPY . .
RUN npm install --include=dev

# Expose Frontend (3000) and Backend (8000)
EXPOSE 3000
EXPOSE 8000

# Entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]
