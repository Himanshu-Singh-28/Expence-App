import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({ open }) => {
  return (
    <Backdrop open={open}>
      <CircularProgress color="warning" />
    </Backdrop>
  );
};

export default Loading;
