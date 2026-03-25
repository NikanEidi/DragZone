#!/bin/bash
# ==============================================================================
# 🐉 DRAGZONE CYBER DRAGON: UNIFIED NETWORK-READY BOOTLOADER
# ==============================================================================

# Optimized for MacBook & iPad Air (Network Mode)

# Colors for the terminal
CYAN='\033[0;36m'
GREEN='\033[0;32m'
PURPLE='\033[0;35m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "=================================================="
echo -e "🐉 Waking up the Cyber Dragon for Network Access..."
echo -e "=================================================="

# Cleanup function to kill background processes on exit
cleanup() {
    echo -e "\n🛑 Protocol Termination Initiated. Shutting down systems..."
    # Kill the background process groups
    kill 0 2>/dev/null
    exit 0
}

# Trap SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

# Detect Local IP for iPad Access
IP_ADDR=$(ipconfig getifaddr en0)
if [ -z "$IP_ADDR" ]; then
    IP_ADDR="localhost"
    echo -e "⚠️ No local IP detected. Using localhost."
else
    echo -e "📱 IPAD ACCESS URL: http://$IP_ADDR:5173"
fi

# 🧠 STEP 1: START DRAGON ENGINE (FastAPI)
echo -e "🚀 Launching DragEngine (Backend: Port 8000)..."
cd DragEngine
# Check if port 8000 is occupied
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "⚠️ Port 8000 is busy. Attempting to clear..."
    kill -9 $(lsof -ti:8000) 2>/dev/null
fi
uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
cd ..

# ⚡ STEP 2: START DRAGZONE UI (React Network Mode)
echo -e "🚀 Launching DragZone UI (Frontend: Port 5173)..."
# Check if port 5173 is occupied
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "⚠️ Port 5173 is busy. Attempting to clear..."
    kill -9 $(lsof -ti:5173) 2>/dev/null
fi
npm run dev -- --host &
FRONTEND_PID=$!

echo -e "\n✨ DRAGON PROTOCOL ONLINE!"
echo -e "--------------------------------------------------"
echo -e "Frontend: http://localhost:5173  |  http://$IP_ADDR:5173"
echo -e "Backend:  http://localhost:8000  |  http://$IP_ADDR:8000"
echo -e "--------------------------------------------------"
echo -e "Press Ctrl+C to enter Deep Sleep mode (Shutdown)."

# Wait for background processes
wait
