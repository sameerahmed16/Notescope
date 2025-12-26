# Notescope - Start Script
# This script starts both the backend and frontend servers

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Starting Notescope Application" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $scriptPath "backend-main"
$frontendPath = Join-Path $scriptPath "frontend-main\app"

# Check if .env files exist
$backendEnv = Join-Path $backendPath ".env"
$frontendEnv = Join-Path $frontendPath ".env.local"

if (-not (Test-Path $backendEnv)) {
    Write-Host "⚠️  WARNING: Backend .env file not found!" -ForegroundColor Yellow
    Write-Host "   Please create $backendEnv with your MongoDB and OpenAI credentials" -ForegroundColor Yellow
    Write-Host ""
}

if (-not (Test-Path $frontendEnv)) {
    Write-Host "⚠️  WARNING: Frontend .env.local file not found!" -ForegroundColor Yellow
    Write-Host "   Please create $frontendEnv with your Firebase credentials" -ForegroundColor Yellow
    Write-Host ""
}

# Check if node_modules exist
if (-not (Test-Path (Join-Path $backendPath "node_modules"))) {
    Write-Host "📦 Installing backend dependencies..." -ForegroundColor Green
    Set-Location $backendPath
    npm install
    Write-Host ""
}

if (-not (Test-Path (Join-Path $frontendPath "node_modules"))) {
    Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Green
    Set-Location $frontendPath
    npm install
    Write-Host ""
}

# Start backend server in a new window
Write-Host "🚀 Starting backend server on http://localhost:3001..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host 'Backend Server - Port 3001' -ForegroundColor Cyan; Write-Host 'Press Ctrl+C to stop' -ForegroundColor Yellow; Write-Host ''; npm start"

# Wait a moment for backend to start
Start-Sleep -Seconds 2

# Start frontend server in a new window
Write-Host "🚀 Starting frontend server on http://localhost:3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host 'Frontend Server - Port 3000' -ForegroundColor Cyan; Write-Host 'Press Ctrl+C to stop' -ForegroundColor Yellow; Write-Host ''; npm run dev"

Write-Host ""
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Two new PowerShell windows have opened - one for each server" -ForegroundColor Yellow
Write-Host "💡 Close those windows to stop the servers" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to exit this window..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

