# Customer Churn Prediction Frontend

This is the **frontend UI** for the Customer Churn Prediction project.  
It is built using **React + Vite** and deployed on **Vercel**.  
The frontend communicates with a FastAPI backend to fetch real-time churn predictions.

---

## Features

- User-friendly interface for entering customer details  
- Sends data to the backend API for churn prediction  
- Displays churn probability and risk category in real-time  
- Clean, responsive UI  
- Fully integrated with deployed backend  

---

## Tech Stack

- **React**  
- **Vite**  
- **JavaScript**  
- **CSS**  
- **Deployed on Vercel**

---

## Live Demo

Frontend URL:  
👉 https://customer-churn-ui-vm2k.vercel.app/

---

## Backend Integration

The frontend connects to the deployed backend API:

- Backend API: https://customer-churn-backend-7hly.onrender.com  
- Endpoint used: `POST /predict`

Make sure the backend is running before testing locally.

---

## Installation & Setup (Local)

### 1. Clone the repository

```bash
git clone https://github.com/Rabindrajena/customer-churn-ui.git
cd customer-churn-ui
```
---

### **2. Install dependencies**

```bash
npm install
```
---

### **3. Run the frontend locally**

```bash
npm run dev
```

The app will be available at:
`http://localhost:5173/`

---

## **Project Structure**

* src/ → React components and logic

* public/ → Static assets

* package.json → Project dependencies

* vite.config.js → Vite configuration

 ---

 ## **Deployment**

* Deployed on Vercel

* Automatic deployments triggered from GitHub

  ---

## **Notes**

* Ensure the backend API URL is correctly configured in the frontend

* Designed to work seamlessly with the FastAPI backend

* Can be extended with charts, analytics, or authentication if needed
