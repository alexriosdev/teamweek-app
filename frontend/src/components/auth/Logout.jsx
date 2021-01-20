import React from "react";
import { Button } from "@material-ui/core";

const Logout = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Button onClick={() => handleLogout()} variant="contained" color="primary">
      Log Out
    </Button>
  );
};

export default Logout;
