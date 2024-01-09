import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'

export const context=createContext({isAuth:false});
export const server="https://expence-app-3h9u.onrender.com/api/v2";

const AppWraper=()=>{
  const [isAuth,setIsAuth]=useState(false);
  const [user,setUser]=useState('');
  const[Expence,setExpence]=useState(null);

  return (
    <context.Provider value={{isAuth,setIsAuth,user,setUser}}>
      <App/>
    </context.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWraper/>
  </React.StrictMode>,
)
