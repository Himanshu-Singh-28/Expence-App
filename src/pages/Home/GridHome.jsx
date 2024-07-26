import React, { useContext, useEffect, useState } from "react";
import { context } from "../../ContextProvider";
import "./GridHome.css";
import { Container, Grid, Typography, IconButton } from "@mui/material";
import HomeLoading from "../Loading/HomeLoading";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";
import "../Home/Home.css";
import Search from "../utils/Search";
import AddExpence from "../AddExpence/AddExpence";
import EditExpence from "../AddExpence/EditExpence";
import Loading from "../Loading/Loading";
import DeleteHandle from "../Delete/DeleteHandle";
import ExpenseCard from "./Card/ExpenseCard";
import { Add as AddIcon } from "@mui/icons-material";
import Profile from "../Profile/Profile";
import { Navigate } from "react-router-dom";

const GridHome = () => {
  const [loadingCard, setLoadingCard] = useState(false);
  const [task, setTask] = useState([]);
  const {
    isAuth,
    setExpense,
    setClose,
    setactive,
    loading,
    addExpense,
    setAddExpense,
    editExpense,
    openProfile,
  } = useContext(context);
  const [reload, setReload] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [searchelement, setSearchelement] = useState("");

  useEffect(() => {
    setLoadingCard(true);
    axios
      .get(`${server}/expence/allexpence`, { withCredentials: true })
      .then((res) => {
        setLoadingCard(false);
        setTask(res.data.data);
        setExpense(task);
        console.log(res);
      })
      .catch((error) => {
        setLoadingCard(false);
        console.log(error.response.data.message);
        setTask([]);
        setExpense(task);
      });
  }, [reload, isAuth]);
  const deleteHandler = (id) => {
    axios
      .delete(`${server}/expence/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message, { duration: 1000 });
        setReload(!reload);
        setIsDelete(false);
      })
      .catch((error) => {
        toast(error.response.data.message, { duration: 1000 });
        setReload(!reload);
      });
  };

  const updateHandler = (id) => {
    axios
      .put(`${server}/expence/done/${id}`, {}, { withCredentials: true })
      .then((res) => {
        setReload(!reload);
      })
      .catch((error) => {
        console.log(error);
        setReload(!reload);
      });
  };
  
  if(!isAuth){
    return <Navigate to="/login" />
  }
  if (loadingCard) {
    return <HomeLoading />;
  }

  return (
    <div
      className="grid-home-container"
      onClick={() => {
        setClose("nav-menu");
        setactive("Link");
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Search setSearchelement={setSearchelement} />
        <Typography variant="h3" color="darkgoldenrod" textTransform={"revert"}>
          All Expenses
        </Typography>
        <div className="grid-container">
          <Grid container spacing={"1rem"} width={"80%"}>
            {task
              ?.filter((val) => {
                if (searchelement == "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(searchelement.toLowerCase())
                ) {
                  return val;
                } else if (val.amount >= searchelement) {
                  return val;
                }
              })
              ?.map((i) => (
                <ExpenseCard
                  key={i._id}
                  id={i._id}
                  title={i.title}
                  amount={i.amount}
                  isCompleted={i.isCompleted}
                  createdAt={i.createdAT}
                  updateHandler={updateHandler}
                  type={i.Type}
                  loading={loading}
                  setDeleteId={setDeleteId}
                  setIsDelete={setIsDelete}
                />
              ))}
          </Grid>
        </div>
      </Container>
      <IconButton
        onClick={() => setAddExpense((prev) => !prev)}
        sx={{
          position: "fixed",
          bottom: "5rem",
          right: "1.5rem",
          backgroundColor: "beige",
          "&:hover": {
            backgroundColor: "white",
          },
        }}
      >
        <AddIcon />
      </IconButton>
      {addExpense && <AddExpence setRelode={setReload} />}
      {editExpense && <EditExpence setRelode={setReload} />}
      {loading && <Loading open={loading} />}
      {openProfile && <Profile />}
      {isDelete && (
        <DeleteHandle
          isDelete={isDelete}
          setIsDelete={setIsDelete}
          deleteHandler={deleteHandler}
          deleteId={deleteId}
        />
      )}
    </div>
  );
};

export default GridHome;
