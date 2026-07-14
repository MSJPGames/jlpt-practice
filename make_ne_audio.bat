@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo edge-tts を確認しています...
pip install edge-tts >nul 2>&1
echo ネパール語の音声を作成します...
python make_ne_audio.py
echo.
pause
