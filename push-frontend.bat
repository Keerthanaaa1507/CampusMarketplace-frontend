@echo off
set "PATH=C:\Users\user\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd;C:\Users\user\AppData\Local\Programs\Git Credential Manager;%PATH%"

echo ========================================================
echo    Pushing Campus Marketplace FRONTEND to GitHub
echo ========================================================
echo.

cd /d "%~dp0"
git remote remove origin 2>nul
git remote add origin https://github.com/Keerthanaaa1507/CampusMarketplace-frontend.git
git push -u origin main

echo.
pause
