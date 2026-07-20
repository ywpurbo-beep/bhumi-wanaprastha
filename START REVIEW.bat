@echo off
setlocal
cd /d "%~dp0"
title Bhumi Wanaprastha - Local Review

echo ========================================
echo  BHUMI WANAPRASTHA - START REVIEW
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

echo Memperbarui konten Markdown...
call npm run build:content
if errorlevel 1 (
  echo.
  echo BUILD GAGAL. Server tidak dijalankan.
  pause
  exit /b 1
)

echo.
echo Membuka preview di laptop...
start "" "http://localhost:8080"
echo Menjalankan server lokal...
node review-server.mjs
