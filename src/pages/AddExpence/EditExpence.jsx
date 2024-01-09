import axios from "axios";
import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { server } from "../../main";
import "./Edit.css";
import toast from 'react-hot-toast';

const EditExpence = () => {
  const [nav, setNav] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Give");

  const data = useLocation().state;
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
        toast.success(res.data.message);
        setNav(true);
      })
      .catch((error) => {
        toast.error(error.response.data);
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
          <select
            onChange={(e) => {
              setType(e.target.value);
            }}
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
