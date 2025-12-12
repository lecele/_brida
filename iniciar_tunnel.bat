@echo off
echo Iniciando Tunel ngrok Fixo...
echo URL: https://malinda-oscitant-trivially.ngrok-free.dev
echo.
echo Mantenha esta janela aberta para que o chat funcione.
echo.
"%USERPROFILE%\Downloads\ngrok.exe" http --domain=malinda-oscitant-trivially.ngrok-free.dev 5678
pause
