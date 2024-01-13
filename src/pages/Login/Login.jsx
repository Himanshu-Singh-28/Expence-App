import React, { useContext, useState } from "react";
import { context, server } from "../../main";
import axios from "axios";
import { Navigate,Link } from "react-router-dom";
import "./Login.css";
import toast from 'react-hot-toast';

const Login = () => {
  const { isAuth, setIsAuth,user } = useContext(context);
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
        toast.success(data.message,{duration:500});
        toast(`Welcome Back ${user.name}`,{duration:1000});
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
  if (isAuth) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div className="loginbox-container">
      <div className="img-container">
        <img src="money.webp" alt="" className="image" />
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
          <button disabled={loading}>Login</button>
          <div> OR </div>
          <Link to={"/register"}>Sing Up</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
