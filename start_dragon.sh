#!/bin/bash

# ==============================================================================
# DRAGZONE: UNIFIED BOOTLOADER (Dragon Engine + React Frontend)
# ==============================================================================

# 🎨 Vibrant Colors for Output
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🐉 INITIALIZING DRAGZONE ECOSYSTEM...${NC}"

# 🛑 GRACEFUL TERMINATION HANDLER
cleanup() {
    echo -e "\n${RED}🛑 SHUTTING DOWN DRAGON ENGINE & VITE...${NC}"
    # Kill the background process groups
    kill $(jobs -p) 2>/dev/null
    exit 0
}

# Trap SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

# 🧠 STEP 1: START DRAGON ENGINE (FastAPI)
echo -e "${CYAN}🚀 Launching DragEngine (Backend: Port 8000)...${NC}"
cd DragEngine
# Check for virtual environment
if [ -d ".venv" ]; then
    source .venv/bin/activate
fi
uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
cd ..

# ⚡ STEP 2: START VITE FRONTEND (React)
echo -e "${CYAN}🚀 Launching DragZone UI (Frontend: Port 5173)...${NC}"
npm run dev &
FRONTEND_PID=$!

echo -e "${GREEN}✨ SYSTEM ONLINE!${NC}"
echo -e "${PURPLE}--------------------------------------------------${NC}"
echo -e "Frontend: http://localhost:5173"
echo -e "Backend:  http://localhost:8000"
echo -e "${PURPLE}--------------------------------------------------${NC}"
echo -e "Press Ctrl+C to terminate the Dragon Protocol."

# Wait for background processes
wait
