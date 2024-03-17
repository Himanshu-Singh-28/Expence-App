import axios from "axios";
import React, { useContext, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { context, server } from "../../main";
import toast from "react-hot-toast";
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

const EditExpence = ({ setRelode }) => {
  const { isAuth, editExpense, setEditExpense } = useContext(context);

  if (!isAuth) {
    return <Navigate replace to="/" />;
  }
  const data = useLocation().state;
  const d = new Date(data.date).toISOString().substring(0, 10);
  console.log(d);
  const [nav, setNav] = useState(false);
  const [title, setTitle] = useState(data.name);
  const [amount, setAmount] = useState(data.amount);
  const [type, setType] = useState(data.type);
  const [date, setDate] = useState(d);

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
        toast.success(res.data.message, { duration: 1000 });
        setNav(true);
        setEditExpense((prev) => !prev);
        setRelode((prev) => !prev);
      })
      .catch((error) => {
        toast.error(error.response.data, { duration: 1000 });
        setNav(false);
      });
  };

  if (nav) {
    return <Navigate to="/" />;
  }
  return (
    <Dialog open={editExpense} onClose={() => setEditExpense((prev) => !prev)}>
      <Stack
        direction={"column"}
        padding={"2rem"}
        width={{ sm: "15rem", md: "25rem" }}
        paddingTop={"0px"}
        alignItems={"center"}
        bgcolor={"#F8F1F1"}
      >
        <DialogTitle variant={{ xs: "h6", md: "h3" }} color={"#83BBEE"}>
          Edit Expense
        </DialogTitle>
        <form className="addExpenseForm">
          <TextField
            type="text"
            label="Title"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Typography sx={{ color: "red", fontSize: "10px" }}>
            Add Small Title
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
            onChange={(e) => setDate(e.target.value)}
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
            Edit Expense
          </Button>
        </form>
      </Stack>
    </Dialog>
  );
};

export default EditExpence;
