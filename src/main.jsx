import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";

export const context = createContext({ isAuth: false });
// export const server=`https://expence-app-dev1.onrender.com/api/v2`;
export const server = `http://localhost:5000/api/v2`;

const AppWraper = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState("");
  const [Expense, setExpense] = useState(null);
  const [close, setClose] = useState("nav-menu");
  const [active, setactive] = useState("Link");
  const [loading, setLoading] = useState(false);
  const[addExpense,setAddExpense]=useState(false);
  const[editExpense,setEditExpense]=useState(false);
  const[refresh,setRefresh]=useState(false);

  return (
    <context.Provider
      value={{
        isAuth,
        setIsAuth,
        user,
        setUser,
        Expense,
        setExpense,
        close,
        setClose,
        active,
        setactive,
        loading,
        setLoading,
        addExpense,
        setAddExpense,
        editExpense,
        setEditExpense,
        refresh,
        setRefresh,
      }}
    >
      <App />
    </context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWraper />
  </React.StrictMode>
);
