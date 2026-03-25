#!/bin/bash
# 🐉 DRAGZONE — DOCKER ENTRYPOINT
set -e

# Wait for potential dependencies (Ollama) if running on network host
# Ollama should be reachable at host.docker.internal:11434 if set in env

echo "🚀 Starting DragEngine (Backend)..."
(cd DragEngine && uvicorn main:app --host 0.0.0.0 --port 8000 --reload) &
BACK_PID=$!

echo "🚀 Starting DragZone UI (Frontend)..."
(cd /app && npm run dev -- --host 0.0.0.0 --port 3000) &
FRONT_PID=$!

# Trap for clean exit
cleanup() {
  echo -e "\n🛑 Shutting down Cyber Dragon..."
  kill $BACK_PID $FRONT_PID 2>/dev/null
  wait $BACK_PID $FRONT_PID 2>/dev/null
  echo -e "✅ Clean exit."
  exit 0
}
trap cleanup SIGINT SIGTERM

wait
