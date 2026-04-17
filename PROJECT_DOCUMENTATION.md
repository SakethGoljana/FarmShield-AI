# 🌿 KisaanMitra: Project Documentation & User Guide

Welcome to the **KisaanMitra** Documentation. This guide explains the logic, architecture, and step-by-step instructions for migrating this project to another computer.

---

## 🏗️ 1. System Architecture

KisaanMitra is a distributed, high-performance agricultural intelligence system consisting of three interconnected layers:

1.  **Frontend (React + Vite)**: A futuristic, responsive UI with glassmorphism, dark/light themes, and real-time data fetching.
2.  **Backend (Node.js + Express)**: Manages authentication (Firebase), database (MongoDB), and acts as a bridge between the user and the AI engine.
3.  **AI Engine (Python + Flask)**: Hosts the deep learning models for plant disease detection and crop recommendation.

---

## 🧠 2. Core Logic Explanation

### 🔬 **Plant Disease Diagnosis**
- **Model**: Custom-trained `MobileNetV2` neural network.
- **Classes**: 71 distinct plant/disease categories.
- **Process**: Normalizes input images to `[-1, 1]` range, passes them through the convolutional layers, and returns the top class with a confidence percentage.
- **Fallback**: If the local AI is booting or fails, it automatically bridges to a Hugging Face cloud model or an offline mathematical heuristic to ensure 100% uptime.

### 🧪 **Soil Analysis & Crop Match**
- **Logic**: Uses a Random Forest Classifier trained on soil nutrient data (Nitrogen, Phosphorus, Potassium, Temperature, Humidity, pH, Rainfall).
- **Auto-Fill**: Integrates OpenWeatherMap API and Browser Geolocation to automatically fetch environmental data based on the user's current coordinates.
- **Rainfall Logic**: If real-time rain is not detected, it defaults to a sensible agricultural average (~100mm) to provide valid crop matching year-round.

---

## 🚀 3. Migration Guide (Moving to another PC)

If you copy this folder to another computer, follow these steps to get it running:

### **Prerequisites**
1.  Install **Node.js** (v18 or higher).
2.  Install **Python** (v3.9 or higher).
3.  Install **Git** (optional).

### **Step-by-Step Setup**

#### **Step 1: Install Dependencies**
Open a terminal in the project folder and run:
```bash
# 1. Install Backend deps
cd server
npm install

# 2. Install Frontend deps
cd ../client
npm install

# 3. Setup Python Virtual Environment
cd ../ml-service
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

#### **Step 2: Configure Environment (.env)**
Ensure the following files have the correct API keys:
- `server/.env`: Requires `MONGODB_URI`, `FIREBASE_PROJECT_ID`, and `OPENWEATHER_API_KEY`.
- `client/.env`: Requires `VITE_API_BASE_URL` (usually http://localhost:5000).

#### **Step 3: Launch with One-Click**
Go back to the main folder and double-click the **`start.bat`** file. It will automatically:
1. Start the Python AI Engine on Port 5001.
2. Start the Node Backend on Port 5000.
3. Start the React Frontend on Port 5173.

---

## 📱 4. Responsiveness

The UI is built with a **Mobile-First** approach:
- Headers and cards scale automatically for smaller screens.
- Flexible grid layouts stack vertically on mobile (Portrait mode).
- Interactive elements are touch-friendly with 44px minimum hit targets.

---

**Tip**: To save this as a PDF, simply open this file in a Markdown viewer or VS Code, and select **"Export to PDF"** or **"Print to PDF"**.

*KisaanMitra — Empowering the future of farming.*
