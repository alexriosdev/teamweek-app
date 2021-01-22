import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import auth from "./auth";

const Logout = () => {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    auth.logout(() => {
      history.push("/");
    });
  };

  return (
    <Button onClick={() => handleLogout()} variant="contained" color="primary">
      Log Out
    </Button>
  );
};

export default Logout;
