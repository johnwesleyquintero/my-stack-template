@echo off
echo Verifying Node.js environment...

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed or not in PATH!
    exit /b 1
)

node "%~dp0verify-env.js"
