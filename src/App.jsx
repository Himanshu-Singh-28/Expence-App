import React, { useContext, useEffect } from 'react'
import Header from './pages/Header/Header'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from './pages/Register/Register'
import axios from "axios"
import { context, server } from './main'
import AddExpence from './pages/AddExpence/AddExpence'
import EditExpence from './pages/AddExpence/EditExpence'
import './App.css';
import {Toaster} from 'react-hot-toast';

function App() {
  const {isAuth,setIsAuth,setUser,user,refresh}=useContext(context);
  useEffect((res)=>{
    axios.get(`${server}/user/myprofil`,{withCredentials:true}).then((res)=>{
      setIsAuth(true);
      setUser(res.data.user);
      console.log(res.data);
    }).catch((error)=>{
      setIsAuth(false);
      console.log(error);
    })
  },[isAuth]);
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/addexpence' element={<AddExpence/>}/>
          <Route path='/edit' element={<EditExpence/>}/>
        </Routes>
        <Toaster/>
      </BrowserRouter>
  )
}

export default App
