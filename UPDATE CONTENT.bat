@echo off
setlocal
cd /d "%~dp0"
title Bhumi Wanaprastha - Update Content

echo ========================================
echo  BHUMI WANAPRASTHA - UPDATE CONTENT
echo ========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js belum tersedia di PATH.
  echo Instal Node.js LTS lalu buka ulang file ini.
  echo.
  pause
  exit /b 1
)

call npm run build:content
if errorlevel 1 (
  echo.
  echo UPDATE GAGAL. Periksa pesan di atas.
  pause
  exit /b 1
)

echo.
echo Konten berhasil diperbarui.
pause
