import React from "react";
import { Link } from "react-router-dom";
import "./ExpenceData.css";
import Loading from "../Loading/Loading";

const ExpenceData = (props) => {
  const d1=props.type=="Give"?"expence-container give ticked":"expence-container take ticked";
  const d2=props.type=="Give"?"expence-container give":"expence-container take";
  const d=props.isCompleted?d1:d2;
  const formater=new Intl.NumberFormat('en-US',{
    style:'currency',
    currency:"INR",
  });

  const date=new Date(props.createdAt).toDateString();
  return (
    <div className={d}>
      <div className="expence-name-container">
        <div className="title">{props.title}</div>
        <div className="title">{formater.format(props.amount)}</div>
      </div>
      <div className="expence-detail-container">
        <div style={{color:props.type=="Give"?"yellow":"rgba(199, 7, 68, 0.801)"}}>{date}</div>
        <div style={{color:props.type=="Take"?"limegreen":"red"}}>{props.type}</div>
        <input
          type="checkbox"
          checked={props.isCompleted}
          onChange={() => props.updateHandler(props.id)}
        />
      </div>

      <div className="expence-button-container">
        <button
          onClick={() => {
            props.deleteHandler(props.id);
          }}
          className={props.isCompleted?"hone-button disabled":"home-button"}
          disabled={props.isCompleted}
        >
          Delete
        </button>
        <Link
          to={"/edit"}
          disabled={props.isCompleted}
          state={{
            name: props.title,
            id: props.id,
            amount: props.amount,
            type: props.type,
            isCompleted: props.isCompleted,
            date: props.createdAt,
          }}
          className="home-button"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ExpenceData;
