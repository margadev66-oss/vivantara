@echo off
setlocal EnableDelayedExpansion

echo ===================================================
echo   Vivantara Windows Standalone Build Script
echo ===================================================

:: --- 1. Check Pre-requisites ---
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install it first.
    pause
    exit /b 1
)

:: --- 2. Clean Previous Build ---
echo.
echo [1/6] Cleaning previous build artifacts...
if exist ".next" (
    rmdir /s /q ".next"
    echo    - Removed .next directory
)
if exist "standalone_dist" (
    rmdir /s /q "standalone_dist"
    echo    - Removed standalone_dist directory
)

:: --- 3. Install Dependencies ---
echo.
echo [2/6] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] npm install failed.
    pause
    exit /b 1
)

:: --- 4. Generate Prisma Client ---
echo.
echo [3/6] Generating Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo [ERROR] Prisma generation failed.
    pause
    exit /b 1
)

:: --- 5. Build Project ---
echo.
echo [4/6] Building Next.js application...
:: Ensure standalone output is set in next.config.ts (which we verified)
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed.
    pause
    exit /b 1
)

:: --- 6. Package Standalone Distribution ---
echo.
echo [5/6] Packaging standalone distribution...
mkdir "standalone_dist"

:: Copy standalone output
echo    - Copying standalone files...
xcopy ".next\standalone" "standalone_dist" /E /I /Q /Y >nul

:: Copy public folder (static assets)
if exist "public" (
    echo    - Copying public folder...
    xcopy "public" "standalone_dist\public" /E /I /Q /Y >nul
)

:: Copy .next/static folder (css/js chunks)
if exist ".next\static" (
    echo    - Copying static assets...
    mkdir "standalone_dist\.next\static"
    xcopy ".next\static" "standalone_dist\.next\static" /E /I /Q /Y >nul
)

:: Copy .env file (runtime config)
if exist ".env" (
    echo    - Copying environment variables...
    copy ".env" "standalone_dist\.env" >nul
) else (
    echo    [WARNING] .env file not found. App might not start correctly without DB config.
)

:: Copy start script
if exist "start_app.bat" (
    echo    - Copying launch script...
    copy "start_app.bat" "standalone_dist\start.bat" >nul
)

:: Copy prisma folder (for migrations if needed) - OPTIONAL
if exist "prisma" (
    echo    - Copying prisma schema...
    xcopy "prisma" "standalone_dist\prisma" /E /I /Q /Y >nul
)

echo.
echo ===================================================
echo [6/6] Build Complete!
echo ===================================================
echo.
echo You can find the standalone application in the 'standalone_dist' folder.
echo To run it, open 'standalone_dist' and double-click 'start.bat'.
echo.

pause
endlocal
