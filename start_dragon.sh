#!/bin/bash
# ═══════════════════════════════════════════════════════
# DRAFZONE UNIFIED BOOTLOADER v3.0
# ═══════════════════════════════════════════════════════
set -e

RED='\033[0;31m'; CYAN='\033[0;36m'; GREEN='\033[0;32m'; NC='\033[0m'; BOLD='\033[1m'

echo -e "${CYAN}${BOLD}═══ DRAFZONE ENGINE ═══${NC}"
echo ""

# Kill any existing processes on our ports
for PORT in 8000 5173; do
  PID=$(lsof -ti:$PORT 2>/dev/null || true)
  if [ -n "$PID" ]; then
    echo -e "${RED}Killing process on port $PORT (PID: $PID)${NC}"
    kill -9 $PID 2>/dev/null || true
  fi
done

# Detect local IP
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || echo "localhost")

# Trap for clean shutdown
cleanup() {
  echo -e "\n${RED}Shutting down...${NC}"
  kill $BACK_PID $FRONT_PID 2>/dev/null
  wait $BACK_PID $FRONT_PID 2>/dev/null
  echo -e "${GREEN}Clean exit.${NC}"
  exit 0
}
trap cleanup SIGINT SIGTERM

# Start backend
echo -e "${GREEN}▸ Starting FastAPI backend on 0.0.0.0:8000${NC}"
cd DragEngine && uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACK_PID=$!
cd ..

# Start frontend
echo -e "${GREEN}▸ Starting Vite frontend on 0.0.0.0:5173${NC}"
npx vite --host 0.0.0.0 --port 5173 &
FRONT_PID=$!

sleep 2
echo ""
echo -e "${CYAN}${BOLD}════════════════════════════════════════${NC}"
echo -e "${CYAN}  MacBook:  http://localhost:5173${NC}"
echo -e "${CYAN}  iPad/LAN: http://${LOCAL_IP}:5173${NC}"
echo -e "${CYAN}  API:      http://${LOCAL_IP}:8000/docs${NC}"
echo -e "${CYAN}${BOLD}════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}Press Ctrl+C to stop all services.${NC}"

wait
