@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ==================================================
echo  N1 listening - make audio (edge-tts + pydub)
echo ==================================================
echo.
echo Folder: %~dp0
echo.

if not exist "%~dp0make_n1_listening_audio.py" (
  echo [ERROR] make_n1_listening_audio.py is NOT in this folder.
  echo         Put the .bat, .py and .json in the SAME folder.
  echo         OneDrive users: keep the files on this device, not online-only.
  echo.
  pause
  exit /b 1
)
if not exist "%~dp0n1_listening_manifest.json" (
  echo [ERROR] n1_listening_manifest.json is NOT in this folder.
  echo         Put the .bat, .py and .json in the SAME folder.
  echo.
  pause
  exit /b 1
)

set "PYCMD="
py -3 --version >nul 2>&1
if !errorlevel! equ 0 (
  set "PYCMD=py -3"
) else (
  python --version >nul 2>&1
  if !errorlevel! equ 0 set "PYCMD=python"
)

if not defined PYCMD (
  echo [ERROR] Python not found.
  echo         Install Python 3 from https://www.python.org/downloads/
  echo         During install, check "Add Python to PATH", then restart the PC.
  echo.
  pause
  exit /b 1
)

echo Using Python:
!PYCMD! --version
echo.
echo Installing edge-tts if needed...
!PYCMD! -m pip install --quiet --upgrade edge-tts

echo.
echo Generating audio...
!PYCMD! "%~dp0make_n1_listening_audio.py"

echo.
echo Done. See the "audio" folder and "_n1_listening_log.txt".
echo Keep the "audio" folder next to your HTML files, then upload it.
echo.
pause
