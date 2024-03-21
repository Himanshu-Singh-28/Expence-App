import React, { useContext, useEffect } from "react";
import Header from "./pages/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import axios from "axios";
import { server } from "./main";
import AddExpence from "./pages/AddExpence/AddExpence";
import EditExpence from "./pages/AddExpence/EditExpence";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Footer from "./pages/Footer/Footer";
import Loading from "./pages/Loading/Loading";
import { context } from "./ContextProvider";
import GridHome from "./pages/Home/GridHome";

function App() {
  const { isAuth, setIsAuth, setUser, loading } = useContext(context);
  useEffect(
    (res) => {
      axios
        .get(`${server}/user/myprofile`, { withCredentials: true })
        .then((res) => {
          setIsAuth(true);
          setUser(res.data.user);
        })
        .catch((error) => {
          setIsAuth(false);
          console.log(error);
        });
    },
    [isAuth]
  );
  // if(loading){
  //   return <Loading open={loading}/>
  // }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<GridHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addexpense" element={<AddExpence />} />
        <Route path="/edit" element={<EditExpence />} />
        <Route path="/Loading" element={<Loading />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
