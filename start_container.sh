#!/bin/bash
# 🐉 DRAGZONE — DOCKER RUNNER
# This script builds the DragZone 'Cyber Dragon' image and starts the container.

# Image Name
IMAGE="dragzone-engine"
CONTAINER="dragzone-live"
ROOT_DIR="/Users/kuroko/Desktop/DragZone"

echo "🛠️  Building DragZone Docker Image [$IMAGE]..."
cd "$ROOT_DIR" && docker build -t $IMAGE .

# Stop any running instances
if [ "$(docker ps -aq -f name=$CONTAINER)" ]; then
    echo "🛑 Stopping existing container [$CONTAINER]..."
    docker stop $CONTAINER > /dev/null
    docker rm $CONTAINER > /dev/null
fi

echo "🚀 Launching Cyber Dragon Container [$IMAGE] on Ports 3000 & 8000..."
# Use --add-host to permit container to talk to Ollama on the Mac host
docker run -d \
    --name $CONTAINER \
    -p 3000:3000 \
    -p 8000:8000 \
    -e OLLAMA_HOST="http://host.docker.internal:11434" \
    --add-host=host.docker.internal:host-gateway \
    $IMAGE

echo ""
echo "════════════════════════════════════════"
echo "  UI (Vite):   http://localhost:3000"
echo "  API (FastAPI): http://localhost:8000/docs"
echo "  Ollama:      Forwarded to host.docker.internal"
echo "════════════════════════════════════════"
echo ""
echo "To view logs, run: docker logs -f $CONTAINER"
echo "To stop, run:   docker stop $CONTAINER"
