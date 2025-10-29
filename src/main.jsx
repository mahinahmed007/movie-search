import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "react-hot-toast";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "linear-gradient(to right, #1e3a8a, #6b21a8)",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px 16px",
        },
      }}
    />
  </StrictMode>,
)
