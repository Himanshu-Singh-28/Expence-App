import React, { useContext, useEffect } from "react";
import { context } from "../../ContextProvider";
import { Navigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
  Avatar,
  Typography,
} from "@mui/material";

const Profile = () => {
  const { user, isAuth, openProfile, setOpenProfile, setClose, setactive } =
    useContext(context);
  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  console.log(user);
  return (
    <Dialog
      open={openProfile}
      onClose={() => {
        setOpenProfile(false);
      }}
    >
      <Stack alignItems={"center"}>
        <DialogTitle variant="h3">PROFILE</DialogTitle>
      </Stack>
      <DialogContent>
        <Stack alignItems={"center"}>
          <Avatar
            variant="circular"
            src={user.profile ? user.profile : ""}
            alt={user.name[0]}
            sx={{ width: "10rem", height: "10rem", fontSize: "5rem" }}
          >
            {user.profile ? "" : user.name[0]}
          </Avatar>
          <Typography variant="body1" color="initial">
            Name : - {user.name}
          </Typography>
          <Typography variant="body1" color="initial">
            Email : - {user.email}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack alignItems={"center"}>
          <Button
            onClick={() => setOpenProfile(false)}
            color="error"
            variant="contained"
          >
            Close
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default Profile;
