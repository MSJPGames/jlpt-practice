@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

echo ============================================
echo  BJT Choukai - make audio (edge-tts)
echo ============================================
echo.

where py >nul 2>&1
if %errorlevel%==0 (
  set PYCMD=py
) else (
  where python >nul 2>&1
  if %errorlevel%==0 (
    set PYCMD=python
  ) else (
    echo [ERROR] Python not found. Please install Python first.
    pause
    exit /b 1
  )
)

echo Using: %PYCMD%
echo.
echo Installing edge-tts (if needed)...
%PYCMD% -m pip install --quiet --upgrade edge-tts

echo.
echo Generating audio... (this may take a minute)
%PYCMD% "%~dp0make_bjt_audio.py"

echo.
echo Done. See the "audio" folder and "_bjt_audio_log.txt".
echo Keep the "audio" folder next to your HTML files, then upload it.
echo.
pause
