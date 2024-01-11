import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { context, server } from "../../main";
import ExpenceData from "./ExpenceData";
import { Navigate,Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import "./Home.css";

const Home = () => {
  const [task, setTask] = useState([]);
  const { isAuth } = useContext(context);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const expance = axios
      .get(`${server}/expence/allexpence`, { withCredentials: true })
      .then((res) => {
        setTask(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setTask([]);
      });
  }, [reload, isAuth]);
  // const updateHandler = (id) => {
  //   axios
  //     .put(`${server}/expence/done/${id}`, {}, { withCredentials: true })
  //     .then((res) => {
  //       console.log(res.data.message);
  //       setReload(!reload);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setReload(!reload);
  //     });
  //   console.log(reload);
  // };
  const deleteHandler = (id) => {
    axios
      .delete(`${server}/expence/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message,{duration:1000});
        setReload(!reload);
      })
      .catch((error) => {
        toast(error.response.data.message,{duration:1000});
        setReload(!reload);
      });
    console.log(reload);
  };
  return (
    <div className="home-container">
      <div className="home-container-box">
        <h3>All Expenses</h3>
        {task.map((i) => (
          <ExpenceData
            id={i._id}
            title={i.title}
            amount={i.amount}
            isCompleted={i.isCompleted}
            createdAt={i.createdAT}
            deleteHandler={deleteHandler}
            type={i.Type}
          />
        ))}
      </div>
      <Link className="add-btn" to={"/addexpense"}>
        <div></div>
        <div></div>
      </Link>
    </div>
  );
};

export default Home;
