import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { context, server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import "./Header.css";

const Header = () => {
  const {
    isAuth,
    setIsAuth,
    user,
    close,
    setClose,
    active,
    setactive,
    setAddExpense,
  } = useContext(context);
  const person = user.name;

  const navMenu = () => {
    active === "Link" ? setactive("Link nav-menu-activate") : setactive("Link");
    close === "nav-menu"
      ? setClose("nav-menu nav-closer")
      : setClose("nav-menu");
  };

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        setIsAuth(false);
        toast.success(res.data.message, { duration: 1000 });
        toast(`Visit Again ${person}`, { duration: 1000 });
      })
      .catch((error) => {
        setIsAuth(true);
        console.log(error);
      });
  };

  const multiCall = () => {
    logoutHandler();
    navMenu();
  };
  return (
    <div className="header">
      <img src="LOGO.jpeg" alt="" className="app-logo" />
      <h3>Expense App</h3>
      <div id="auth-name">{isAuth ? user.name : ""}</div>
      <div className={active}>
        <Link to={"/"} className="button" onClick={navMenu}>
          Home
        </Link>
        {isAuth ? (
          <button onClick={multiCall} className={"logout"}>
            Logout
          </button>
        ) : (
          <Link to={"/login"} className="login" onClick={navMenu}>
            Login
          </Link>
        )}
        <Link to={"/register"} className="button" onClick={navMenu}>
          Register
        </Link>
        <Link className="button" onClick={() => setAddExpense((prev) => !prev)}>
          AddExpense
        </Link>
      </div>
      <div onClick={navMenu} className={close}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </div>
  );
};

export default Header;
