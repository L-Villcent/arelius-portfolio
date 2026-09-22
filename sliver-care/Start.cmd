@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is needed for a shared local workspace across pages.
  echo You can open index.html for a file-based preview, but browser storage may be separate per page.
  pause
  exit /b 1
)
echo Open http://127.0.0.1:4174 in your browser. Keep this window open.
node server.cjs
pause
