import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import auth from "./auth";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.custom.dark,
    height: "2rem",
    width: "2rem",
    // backgroundColor: theme.palette.common.black,
  },
  name: {
    ...theme.typography.button,
  },
}));

const Logout = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.userState.currentUser);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = () => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    auth.logout(() => {
      history.push("/");
    });
  };

  return (
    // <Button onClick={() => handleLogout()} variant="contained" color="primary">
    //   Log Out
    // </Button>
    <>
      <Typography component="h1" variant="h5" className={classes.name}>
        {user ? user.first_name : "Not Logged In"}
      </Typography>
      <Avatar
        onClick={handleClick}
        src={user.avatar}
        aria-controls="simple-menu"
        aria-haspopup="true"
        className={classes.avatar}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleLogout}>
          <ExitToAppIcon />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Logout;
