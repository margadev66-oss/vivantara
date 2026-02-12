@echo off
setlocal

:: --- Configuration ---
set PORT=3000
set HOSTNAME=0.0.0.0

:: --- Check if node is installed ---
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: --- Run the server ---
echo Starting Vivantara server on port %PORT%...
node server.js

endlocal
pause
