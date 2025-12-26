@echo off
REM Notescope - Start Script (Batch version)
REM This script starts both the backend and frontend servers

echo ========================================
echo    Starting Notescope Application
echo ========================================
echo.

REM Get the script directory
set "SCRIPT_DIR=%~dp0"
set "BACKEND_PATH=%SCRIPT_DIR%backend-main"
set "FRONTEND_PATH=%SCRIPT_DIR%frontend-main\app"

REM Check if .env files exist
if not exist "%BACKEND_PATH%\.env" (
    echo WARNING: Backend .env file not found!
    echo Please create %BACKEND_PATH%\.env with your MongoDB and OpenAI credentials
    echo.
)

if not exist "%FRONTEND_PATH%\.env.local" (
    echo WARNING: Frontend .env.local file not found!
    echo Please create %FRONTEND_PATH%\.env.local with your Firebase credentials
    echo.
)

REM Check if node_modules exist
if not exist "%BACKEND_PATH%\node_modules" (
    echo Installing backend dependencies...
    cd /d "%BACKEND_PATH%"
    call npm install
    echo.
)

if not exist "%FRONTEND_PATH%\node_modules" (
    echo Installing frontend dependencies...
    cd /d "%FRONTEND_PATH%"
    call npm install
    echo.
)

REM Start backend server in a new window
echo Starting backend server on http://localhost:3001...
start "Notescope Backend - Port 3001" cmd /k "cd /d %BACKEND_PATH% && echo Backend Server - Port 3001 && echo Press Ctrl+C to stop && echo. && npm start"

REM Wait a moment for backend to start
timeout /t 2 /nobreak >nul

REM Start frontend server in a new window
echo Starting frontend server on http://localhost:3000...
start "Notescope Frontend - Port 3000" cmd /k "cd /d %FRONTEND_PATH% && echo Frontend Server - Port 3000 && echo Press Ctrl+C to stop && echo. && npm run dev"

echo.
echo Both servers are starting!
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:3001
echo.
echo Two new command windows have opened - one for each server
echo Close those windows to stop the servers
echo.
pause

