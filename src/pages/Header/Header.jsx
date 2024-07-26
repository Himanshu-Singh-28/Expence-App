import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import "./Header.css";
import { context } from "../../ContextProvider";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Avatar } from "@mui/material";
import UserAvtar from "../utils/UserAvtar";

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
  const person = user?.name;

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
        toast.success(res.data.message, { duration: 5000 });
        toast(`Visit Again ${person}`, { duration: 5000 });
      })
      .catch((error) => {
        setIsAuth(true);
        console.log(error);
      });
  };
  return (
    <div className="header">
      <img src="LOGO.jpeg" alt="" className="app-logo" />
      <h3>Expense App</h3>
      <div className={active}>
        <Link to={"/"} className="button" onClick={navMenu}>
          Home
        </Link>

        <Link
          to={"/register"}
          className="button"
          onClick={navMenu}
          style={{ display: isAuth ? "none" : "block" }}
        >
          Register
        </Link>
        <Link
          className="button"
          onClick={() => setAddExpense((prev) => !prev)}
          style={{ display: isAuth ? "block" : "none" }}
        >
          AddExpense
        </Link>
        {isAuth ? (
          <>
            <UserAvtar logoutHandler={logoutHandler} />
          </>
        ) : (
          <Link to={"/login"} className="login" onClick={navMenu}>
            Login
          </Link>
        )}
      </div>
      <div onClick={navMenu} className={close} style={{ color: "white" }}>
        <MenuIcon />
      </div>
    </div>
  );
};

export default Header;
