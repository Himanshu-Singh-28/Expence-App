import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ExpenceData.css";
import toast from "react-hot-toast";
import { context } from "../../main";
import {Checkbox} from '@mui/material'

const ExpenceData = (props) => {
  const d1 =
    props.type == "Give"
      ? "expence-container give ticked"
      : "expence-container take ticked";
  const d2 =
    props.type == "Give" ? "expence-container give" : "expence-container take";
  const d = props.isCompleted ? d1 : d2;
  const formater = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });
  const date = new Date(props.createdAt).toDateString();
  const { setEditExpense } = useContext(context);
  return (
    <div className={d}>
      <div className="expence-name-container">
        <div className="title">{props.title}</div>
        <div className="title">{formater.format(props.amount)}</div>
      </div>
      <div className="expence-detail-container">
        <div
          style={{
            color: props.type == "Give" ? "yellow" : "rgba(199, 7, 68, 0.801)",
          }}
        >
          {date}
        </div>
        <div style={{ color: props.type == "Take" ? "limegreen" : "red" }}>
          {props.type}
        </div>
        <Checkbox
          size={"small"}
          defaultChecked={props.isCompleted}
          color="success"
          onChange={() => props.updateHandler(props.id)}
        />
      </div>

      <div className="expence-button-container">
        <button
          onClick={() => {
            props.setIsDelete(prev=>!prev);
            props.setDeleteId(props.id);
          }}
          className="home-button"
        >
          Delete
        </button>
        <Link
          state={{
            name: props.title,
            id: props.id,
            amount: props.amount,
            type: props.type,
            isCompleted: props.isCompleted,
            date: props.createdAt,
          }}
          onClick={
            props.isCompleted
              ? () => toast.success("Expense is Completed Can't Edit")
              : () => setEditExpense((prev) => !prev)
          }
          className="home-button"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ExpenceData;
