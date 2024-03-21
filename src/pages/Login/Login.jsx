import React, { useContext, useState } from "react";
import { server } from "../../main";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import "./Login.css";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import { IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { context } from "../../ContextProvider";

const Login = () => {
  const { isAuth, setIsAuth, user, setClose, setactive } = useContext(context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/user/login`,
        { email, password },
        { withCredentials: true }
      );
      if (data.success) {
        setIsAuth(true);
        toast.success(data.message, { duration: 500 });
        toast(`Welcome Back ${user.name}`, { duration: 1000 });
      } else {
        toast.error(data.message);
        setIsAuth(false);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuth(false);
      setSucess(false);
      setLoading(false);
    }
  };

  const loginHandler = () => {
    window.open("https://expence-app-dev1.onrender.com/google/login", "_self");
  };
  if (isAuth) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div
      className="loginbox-container"
      onClick={() => {
        setClose("nav-menu");
        setactive("Link");
      }}
    >
      <div className="img-container">
        <img height={"100%"} width={"100%"} src="money.webp" />
      </div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
        <form onSubmit={submitHandler}>
          <h3>Login</h3>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="pass">Password</label>
          <input
            id="pass"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={loading} className="button">
            Login
          </button>
          <div className="social-container">
            <span>Login With: </span>
            <IconButton
              onClick={loginHandler}
              size="small"
              sx={{
                bgcolor: "white",
                color: "-moz-initial",
                "&:hover": {
                  bgcolor: "gray",
                },
                margin: 0,
              }}
            >
              <GoogleIcon />
            </IconButton>
          </div>
          <span>Don't have Account ?</span>
          <Link to={"/register"} style={{ color: "lightblue" }}>
            Register Here
          </Link>
        </form>
      </div>
      {loading && <Loading open={loading} />}
    </div>
  );
};

export default Login;
