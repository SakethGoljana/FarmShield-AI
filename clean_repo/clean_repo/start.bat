@echo off
setlocal

echo 🌿 KisaanMitra Launcher 🚀
echo ============================

:: 1. Start Python ML Service
echo [1/3] Starting Python ML Service (Port 5001)...
cd ml-service
start "ML Service" cmd /c ".\venv\Scripts\python.exe app.py"
cd ..

:: 2. Start Node.js Backend
echo [2/3] Starting Node.js Backend (Port 5000)...
cd server
start "Node Backend" cmd /c "npm run dev"
cd ..

:: 3. Start React Frontend
echo [3/3] Starting React Frontend (Port 5173)...
cd client
start "React Frontend" cmd /c "npm run dev"
cd ..

echo.
echo ✅ All services launched in separate windows!
echo 🔗 Frontend: http://localhost:5173
echo 🔗 Backend:  http://localhost:5000
echo 🔗 ML API:   http://localhost:5001
echo.
echo Press any key to exit this launcher...
pause > null
