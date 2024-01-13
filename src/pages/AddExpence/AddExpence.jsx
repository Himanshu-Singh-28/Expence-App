import React, { useContext, useState } from "react";
import axios from "axios";
import { context, server } from "../../main";
import "./AddExpence.css";
import RecentData from "./RecentData";
import toast from 'react-hot-toast';
import {Navigate} from 'react-router-dom';

const AddExpence = () => {
  const data=[];
  const [arr,setarr]=useState(data);
  const a = new Date();
  const d = a.toISOString().substring(0, 10);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setdate] = useState(d);
  const [type, setType] = useState("Give");
  const {isAuth}=useContext(context);

  if(!isAuth){
    toast.error("Login First");
    return <Navigate to={"/login"}/>
  }

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `${server}/expence/newexpence`,
        {
          title: title,
          amount: amount,
          date: date,
          type: type,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message,{duration:1000});
        const dat=new Date(date).toDateString();
        const a=[...arr,{title:title,amount:amount,date:dat,type:type}];
        setarr(a);
      })
      .catch((error) => {
        toast.error(error.response.data.message,{duration:1000});
      });
  };

  return (
    <div className="add-container">
      <form onSubmit={submitHandler}>
  
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p style={{color:"red",fontSize:"10px"}}>Add Small Title</p>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input type="date" value={date} onChange={(e) => setdate(e.target.value)} />
        <select
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="Give">Give</option>
          <option value="Take">Take</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
      <div className="recent-container">
      <h2>Recent Expence Added</h2>
        {
        arr.map((i)=>
        <RecentData 
            title={i.title}
            amount={i.amount}
            date={i.date}
            type={i.type}
        />
        )
        }
      </div>
    </div>
  );
};

export default AddExpence;
