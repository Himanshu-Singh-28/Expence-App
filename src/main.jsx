import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import ContextProvider from "./ContextProvider.jsx";

// export const server = `https://expence-app-dev1.onrender.com/api/v2`;
export const server = `/api/v2`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
