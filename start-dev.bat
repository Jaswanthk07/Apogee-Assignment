@echo off
echo ========================================
echo Action Items Manager - Development Mode
echo ========================================
echo.
echo Starting Backend Server...
start cmd /k "cd server && npm run dev"
timeout /t 3 /nobreak > nul
echo.
echo Starting Frontend...
start cmd /k "npm run dev"
echo.
echo ========================================
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo ========================================
