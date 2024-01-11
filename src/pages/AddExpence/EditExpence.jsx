import axios from "axios";
import React, { useContext, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { context, server } from "../../main";
import "./Edit.css";
import toast from 'react-hot-toast';

const EditExpence = () => {
  const {isAuth}=useContext(context);

  if(!isAuth){
    return <Navigate replace to="/" />;
  }
  const data = useLocation().state;
  const d=new Date(data.date);
  const [nav, setNav] = useState(false);
  const [title, setTitle] = useState(data.name);
  const [amount, setAmount] = useState(data.amount);
  const [type, setType] = useState(data.type);
  const [date,setDate]=useState(d);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(
        `${server}/expence/${data.id}`,
        {
          title: title,
          amount: amount,
          type: type,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message,{duration:1000});
        setNav(true);
      })
      .catch((error) => {
        toast.error(error.response.data,{duration:1000});
        setNav(false);
      });
  };

  if (nav) {
    return <Navigate to="/" />;
  }
  const formater = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });
  return (
    <div className="edit-container">
      <div className="shape2"></div>
      <div className="shape2"></div>
      <div className="edit-form-container">
        <div className="detail-container">
          <h3>Edit Expence</h3>
          <div>
            <div>{data.name}</div>
            <div>{"Amount:- " + formater.format(data.amount)}</div>
          </div>
          <div id="date">
            <div>{Date(data.date).toString().substring(0, 16)}</div>
            <div>{"Type:- "+data.type}</div>
          </div>
        </div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {/* <input 
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          /> */}
          <select
            onChange={(e) => {
              setType(e.target.value);
            }}
            value={type}
          >
            <option value="Give">Give</option>
            <option value="Take">Take</option>
          </select>
          
          <button type="submit">Edit Expense</button>
        </form>
      </div>
    </div>
  );
};

export default EditExpence;
