import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { context, server } from "../../main";
import ExpenceData from "./ExpenceData";
import { Navigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./Home.css";

const Home = () => {
  const [task, setTask] = useState([]);
  const { isAuth, setExpense } = useContext(context);
  const [reload, setReload] = useState(false);
  const [searchelement, setSearchelement] = useState("");
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    const expance = axios
      .get(`${server}/expence/allexpence`, { withCredentials: true })
      .then((res) => {
        setTask(res.data.data);
        setExpense(task);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setTask([]);
        setExpense(task);
        setLoading(false);
      });
  }, [reload, isAuth]);
  const deleteHandler = (id) => {
    setLoading(true);
    axios
      .delete(`${server}/expence/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message, { duration: 1000 });
        setReload(!reload);
        setLoading(false);
      })
      .catch((error) => {
        toast(error.response.data.message, { duration: 1000 });
        setReload(!reload);
        setLoading(false);
      });
    console.log(reload);
  };

  const updateHandler = (id) => {
    setLoading(true);
      axios
        .put(`${server}/expence/done/${id}`, {}, { withCredentials: true })
        .then((res) => {
          setReload(!reload);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setReload(!reload);
          setLoading(false);
        });
      console.log(reload);
  }

  // if(loading){
  //   toast.loading("Loading Please Wait");
  // }

  return (
    <div className="home-container">
      <div className={isAuth?"hide":"home-container-box"}>
        <h3 style={{color:"red"}}>Login / Register First to See Data</h3>
      </div>
      <div className={isAuth?"home-container-box":"hide"}>
        <input
          id="search"
          className={"search-bar"}
          type="search"
          placeholder="Search Expense Here.."
          onChange={(event) => {
            setSearchelement(event.target.value);
          }}
        />
        <h3>All Expenses</h3>
        {task
        .filter((val)=>{
          if(searchelement==""){
            return val;
          }else if(val.title.toLowerCase().includes(searchelement.toLowerCase())){
            return val;
          }else if(val.amount >= (searchelement)){
            return val;
          }
        })
        .map((i) => (
          <ExpenceData
            key={i._id}
            id={i._id}
            title={i.title}
            amount={i.amount}
            isCompleted={i.isCompleted}
            createdAt={i.createdAT}
            deleteHandler={deleteHandler}
            updateHandler={updateHandler}
            type={i.Type}
          />
        ))}
      </div>
      <Link className={isAuth?"add-btn":"hide"} to={"/addexpense"}>
        <div></div>
        <div></div>
      </Link>
    </div>
  );
};

export default Home;
