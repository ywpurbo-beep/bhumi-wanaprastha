@echo off
setlocal
title Bhumi Wanaprastha - Stop Review

echo Menghentikan server review pada port 8080...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8080" ^| findstr "LISTENING"') do (
  taskkill /PID %%a /F >nul 2>nul
)
echo Server review dihentikan jika sebelumnya aktif.
pause
