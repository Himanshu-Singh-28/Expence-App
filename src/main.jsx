import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'


export const context=createContext({isAuth:false});
export const server=`https://expence-app-dev1.onrender.com/api/v2`;

const AppWraper=()=>{
  const [isAuth,setIsAuth]=useState(false);
  const [user,setUser]=useState('');
  const[Expense,setExpense]=useState(null);
  const [close,setClose]=useState("nav-menu");
  const [active,setactive]=useState("Link");
  const [loading,setLoading]=useState(false);
  

  return (
    <context.Provider value={{isAuth,setIsAuth,user,setUser,Expense,setExpense,close,setClose,active,setactive,loading,setLoading}}>
      <App/>
    </context.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWraper/>
  </React.StrictMode>,
);
