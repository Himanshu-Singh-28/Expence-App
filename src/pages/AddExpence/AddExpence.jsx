import React, { useContext, useState } from "react";
import axios from "axios";
import { server } from "../../main";
import "./AddExpence.css";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  Select,
  MenuItem,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { context } from "../../ContextProvider";

const AddExpence = ({ setRelode }) => {
  const data = [];
  const [arr, setarr] = useState(data);
  const a = new Date();
  const d = a.toISOString().substring(0, 10);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setdate] = useState(d);
  const [type, setType] = useState("Give");
  const { isAuth, addExpense, setAddExpense } = useContext(context);

  if (!isAuth) {
    toast.error("Login First");
    return <Navigate to={"/login"} />;
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
        toast.success(res.data.message, { duration: 1000 });
        const dat = new Date(date).toDateString();
        const a1 = [
          ...arr,
          { title: title, amount: amount, date: dat, type: type },
        ];
        setarr(a1);
        setTitle("");
        setAmount("");
        setdate(d);
        setAddExpense((prev) => !prev);
        setRelode((prev) => !prev);
      })
      .catch((error) => {
        toast.error(error.response.data.message, { duration: 1000 });
      });
  };

  return (
    <Dialog open={addExpense} onClose={() => setAddExpense((prev) => !prev)}>
      <Stack
        direction={"column"}
        padding={"2rem"}
        width={{ sm: "15rem", md: "25rem" }}
        paddingTop={"0px"}
        alignItems={"center"}
        bgcolor={"#F8F1F1"}
      >
        <DialogTitle variant={{ xs: "h6", md: "h3" }} color={"#83BBEE"}>
          Add Expense
        </DialogTitle>
        <form className="addExpenseForm">
          <TextField
            type="text"
            label="Title"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Typography variant={"caption"} sx={{ color: "red", fontSize: "10px" }}>
            {"Add Small Title"}
          </Typography>
          <TextField
            type="number"
            label="Amount"
            size="small"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            type="date"
            size="small"
            value={date}
            sx={{
              margin: "1rem",
            }}
            onChange={(e) => setdate(e.target.value)}
          />
          <Select
            value={type}
            size="small"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={"Give"}>Give</MenuItem>
            <MenuItem value={"Take"}>Take</MenuItem>
          </Select>
          <Button
            type="submit"
            variant="contained"
            sx={{ margin: "1rem" }}
            onClick={submitHandler}
          >
            Add Expense
          </Button>
        </form>
      </Stack>
    </Dialog>
  );
};

export default AddExpence;
