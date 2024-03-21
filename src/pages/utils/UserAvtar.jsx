import React, { useContext, useRef, useState } from "react";
import { IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { context } from "../../ContextProvider";

const UserAvtar = ({ logoutHandler }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { setOpenProfile, setClose, setactive, user } = useContext(context);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar
          src={user.profile ? user.profile : ""}
          alt={user.name[0]}
          sx={{ width: 32, height: 32 }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        onClick={() => setOpenMenu(false)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            setOpenProfile(true);
            setClose("nav-menu");
            setactive("Link");
          }}
        >
          <IconButton>
            <Avatar src={user.profile ? user.profile : ""} alt={user.name[0]} />
          </IconButton>
          Profile
        </MenuItem>
        <MenuItem onClick={logoutHandler}>
          <IconButton>
            <Logout />
          </IconButton>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserAvtar;
