@echo off
chcp 932 >nul
cd /d "%~dp0"
echo ============================================
echo  N1 chokai no onsei wo tsukurimasu
echo ============================================
echo.
if not exist n1_listening_manifest.json (
  echo *** n1_listening_manifest.json ga arimasen ***
  echo Kono .bat wo "JLPT PRACTICE" folder ni oite kudasai.
  pause & exit /b
)
set PYEXE=
py --version >nul 2>&1 && set PYEXE=py
if "%PYEXE%"=="" ( python --version >nul 2>&1 && set PYEXE=python )
if "%PYEXE%"=="" ( python3 --version >nul 2>&1 && set PYEXE=python3 )
if "%PYEXE%"=="" (
  echo *** Python ga mitsukarimasen ***
  pause & exit /b
)
echo [tsukau Python] %PYEXE%
%PYEXE% -c "import edge_tts" 2>nul
if errorlevel 1 (
  echo edge-tts wo install shimasu...
  %PYEXE% -m pip install -U edge-tts
)
echo.
%PYEXE% make_n1_listening_audio.py
echo.
echo Kekka wa _n1_listening_log.txt ni mo hozon shimashita.
pause
