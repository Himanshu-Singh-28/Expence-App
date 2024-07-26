import React, { memo, useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  Avatar,
  Typography,
  Checkbox,
  Box,
  IconButton,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  CalendarMonth as CalendarIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import "./ExpenceData.css";
import { context } from "../../../ContextProvider";
import { Link } from "react-router-dom";

const ExpenseCard = ({
  id,
  title,
  amount,
  isCompleted,
  createdAt,
  updateHandler,
  type,
  loading,
  setDeleteId,
  setIsDelete,
}) => {
  const date = new Date(createdAt).toDateString();
  const { setEditExpense } = useContext(context);
  const formater = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });
  return (
    <>
      <Grid item xs={12} sm={4} md={3} minWidth={{xs:"250px",sm:"220px",md:"190px"}}>
        <div style={{ position: "relative" }}>
          <div
            className="badge"
            style={{
              opacity: isCompleted ? 0.4 : 1,
            }}
          >
            {type == "Give" ? "Give" : "Take"}
          </div>
          <Card
            variant="elevation"
            style={{
              backgroundColor: "rgba(255,255,255,0.8)",
              opacity: isCompleted ? 0.5 : 1,
            }}
          >
            <CardContent>
              <Stack alignItems={"center"}>
                <Avatar
                  variant="circular"
                  sx={{
                    width: { sm: "2rem", xs: "3rem" },
                    height: { sm: "2rem", xs: "3rem" },
                    bgcolor: "black",
                    border: "2px solid white",
                  }}
                >
                  {title[0] + title[1]}
                </Avatar>
                <Tooltip title={title.length > 10 ? title : ""}>
                  <Typography variant="h6" color="initial">
                    {title.length > 10 ? `${title.substr(0, 9)}....` : title}
                  </Typography>
                </Tooltip>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: "0.2rem", sm: "1rem", md: "2rem" },
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <Typography
                    variant="caption"
                    fontSize={{ sm: "0.7rem", md: "0.8rem" }}
                    color={type == "Give" ? "Red" : "green"}
                  >
                    {formater.format(amount)}
                  </Typography>
                  <Tooltip title="Mark Completed">
                    <Checkbox
                      size="small"
                      defaultChecked={isCompleted}
                      color="success"
                      onChange={() => updateHandler(id)}
                    />
                  </Tooltip>
                </Box>
                <Stack
                  direction={{ md: "row", xs: "column" }}
                  alignItems={"center"}
                  fontSize={{ xs: "0.8rem", sm: "0.9rem", md: "15px" }}
                >
                  <Box color={"#1DD2DB"}>
                    <CalendarIcon />
                  </Box>
                  <Box color={"darkcyan"}>{date}</Box>
                </Stack>
              </Stack>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <IconButton
                sx={{
                  height: "2.2rem",
                  width: "2.2rem",
                  bgcolor: "red",
                }}
                onClick={() => {
                  setIsDelete((prev) => !prev);
                  setDeleteId(id);
                }}
              >
                <DeleteIcon />
              </IconButton>

              <IconButton
                disabled={isCompleted}
                sx={{
                  height: "2.2rem",
                  width: "2.2rem",
                  bgcolor: "blue",
                }}
                onClick={() => setEditExpense((prev) => !prev)}
              >
                <Link
                  state={{
                    name: title,
                    id: id,
                    amount: amount,
                    type: type,
                    isCompleted: isCompleted,
                    date: createdAt,
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <EditIcon />
                </Link>
              </IconButton>
            </CardActions>
          </Card>
        </div>
      </Grid>
    </>
  );
};

export default memo(ExpenseCard);
