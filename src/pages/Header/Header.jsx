import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { context, server } from '../../main'
import axios from "axios"
import './Header.css'

const Header = () => {
  const {isAuth,setIsAuth,user}=useContext(context);
  const [active,setactive]=useState("Link");
  const[close,setclose]=useState("nav-menu");

  const navMenu=()=>{
    active==='Link'?setactive("Link nav-menu-activate"):setactive("Link");
    close==="nav-menu"?setclose("nav-menu nav-closer"):setclose("nav-menu");
  }

  const logoutHandler=()=>{
    axios.get(`${server}/user/logout`,{withCredentials:true}).then((res)=>{
      setIsAuth(false);
      console.log(res.data);
    }).catch((error)=>{
      setIsAuth(true);
      console.log(error);
    });
  }

  const multiCall=()=>{
    logoutHandler();
    navMenu();
  }
  return (
    <div className='header'>
       <h3>Expence app</h3>
       <div id='auth-name'>{isAuth?user.name:""}</div>
        <div className={active}>
          <Link to={"/"} className='button' onClick={navMenu}>Home</Link>
          {
            isAuth?<button onClick={multiCall} className={"logout"}>Logout</button>
            :<Link to={"/login"} className="login" onClick={navMenu}>Login</Link>
          }
          <Link to={"/register"} className='button' onClick={navMenu}>Register</Link>
          <Link to={"/addexpence"} className='button' onClick={navMenu}>AddExpence</Link>
        </div>
        <div onClick={navMenu} className={close}>
          <div className='line1'></div>
          <div className='line2'></div>
          <div className='line3'></div>
        </div>   
    </div>
  )
}

export default Header