#!/bin/bash

echo "========================================"
echo "Action Items Manager - Development Mode"
echo "========================================"
echo ""
echo "Starting Backend Server..."
cd server && npm run dev &
BACKEND_PID=$!
cd ..
sleep 3
echo ""
echo "Starting Frontend..."
npm run dev &
FRONTEND_PID=$!
echo ""
echo "========================================"
echo "Both servers are starting..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop both servers"
wait
